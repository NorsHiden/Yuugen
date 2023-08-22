import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'discord.js';
import { GuildConnectionService } from './guild-connection.service';
import player from 'play-dl';
import { createAudioResource } from '@discordjs/voice';

@Injectable()
export class PlayerService {
  constructor(
    private readonly client: Client,
    private readonly guildConnectionService: GuildConnectionService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.client.guilds.cache.forEach(async (guild) => {
      this.guildConnectionService
        .get(guild.id)
        .player.on('stateChange', (oldState, newState) => {
          const currentGuild = this.guildConnectionService.get(guild.id);
          if (newState.status === 'idle' && currentGuild.state == 'playing')
            this.skip(guild.id);
        });
    });
  }

  async playIndex(guildId: string, index: number) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    const song = connection.queue[index];
    if (!song) throw new NotFoundException('Song not found');
    if (index > 0 && index < connection.queue.length)
      connection.currentIndex = index;
    else connection.currentIndex = 0;
    connection.state = 'idle';
    this.guildConnectionService.set(guildId, connection);
    return this.play(guildId);
  }

  async play(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (connection.state === 'paused') {
      connection.player.unpause();
      connection.state = 'playing';
      return { message: 'Playing song', statusCode: 200 };
    }
    const stream = await player.stream(
      connection.queue[connection.currentIndex].url,
      {
        discordPlayerCompatibility: true,
        quality: 3,
      },
    );
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      inlineVolume: true,
    });
    connection.player.play(resource);
    connection.stream = resource;
    connection.state = 'playing';
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Playing song', statusCode: 200 };
  }

  async pause(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (connection.state === 'paused') return this.play(guildId);
    connection.player.pause();
    connection.state = 'paused';
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Paused song', statusCode: 200 };
  }

  async previous(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (connection.currentIndex > 0) connection.currentIndex--;
    else return;
    connection.state = 'idle';
    this.guildConnectionService.set(guildId, connection);
    this.play(guildId);
    return { message: 'Previous song', statusCode: 200 };
  }

  async skip(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (connection.currentIndex + 1 < connection.queue.length)
      connection.currentIndex++;
    else if (connection.isLooping) connection.currentIndex = 0;
    else return;
    connection.state = 'idle';
    this.guildConnectionService.set(guildId, connection);
    this.play(guildId);
    return { message: 'Skipped song', statusCode: 200 };
  }

  async loop(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    connection.isLooping = !connection.isLooping;
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Looped song', statusCode: 200 };
  }

  async stop(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    connection.player.stop();
    connection.state = 'idle';
    connection.currentIndex = -1;
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Stopped song', statusCode: 200 };
  }
}
