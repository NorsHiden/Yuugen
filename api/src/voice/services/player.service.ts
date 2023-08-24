import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
          if (newState.status === 'idle' && currentGuild.state == 'playing') {
            if (
              currentGuild.loopState == 'none' &&
              currentGuild.currentIndex + 1 >= currentGuild.queue.length
            )
              return this.stop(guild.id);
            else if (currentGuild.loopState == 'song')
              return this.playIndex(guild.id, currentGuild.currentIndex);
            this.skip(guild.id);
          }
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
        quality: 3,
      },
    );
    connection.seek = 0;
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      inlineVolume: true,
    });
    connection.player.play(resource);
    connection.stream = resource;
    resource.volume.setVolume(connection.volume / 100);
    connection.state = 'playing';
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Playing song', statusCode: 200 };
  }

  async playAt(guildId: string, time: number) {
    if (time < 0)
      throw new BadRequestException('Time must be greater than 0 seconds');
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
        quality: 3,
        seek: time,
      },
    );
    connection.seek = time;
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      inlineVolume: true,
    });
    connection.player.play(resource);
    connection.stream = resource;
    resource.volume.setVolume(connection.volume / 100);
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
    else if (connection.loopState == 'queue') connection.currentIndex = 0;
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
    if (connection.loopState === 'none') connection.loopState = 'queue';
    else if (connection.loopState === 'queue') connection.loopState = 'song';
    else connection.loopState = 'none';
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

  async shuffle(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (connection.queue.length <= 1)
      throw new BadRequestException(
        "Can't shuffle queue with less than 2 songs",
      );
    if (connection.currentIndex < 0)
      throw new BadRequestException("Can't shuffle queue while not playing");
    const currentSong = connection.queue[connection.currentIndex];
    for (let i = connection.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [connection.queue[i], connection.queue[j]] = [
        connection.queue[j],
        connection.queue[i],
      ];
    }
    connection.currentIndex = connection.queue.indexOf(currentSong);
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Shuffled queue', statusCode: 200 };
  }

  async setVolume(guildId: string, value: number) {
    if (value < 0 || value > 100)
      throw new BadRequestException('Volume must be between 0 and 100');
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (connection.stream) {
      connection.stream.volume.setVolume(value / 100);
      connection.volume = value;
    }
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Set volume', statusCode: 200 };
  }

  async seek(guildId: string, value: number) {
    if (value < 0)
      throw new BadRequestException('Seek value must be greater than 0');
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    this.playAt(guildId, value);
    connection.seek = value;
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Set volume', statusCode: 200 };
  }
}
