import { joinVoiceChannel } from '@discordjs/voice';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';
import { GuildConnectionService } from './guild-connection.service';
import player from 'play-dl';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class VoiceService {
  constructor(
    private readonly client: Client,
    private readonly guildConnectionService: GuildConnectionService,
    private readonly userService: UserService,
  ) {}

  async join(guildId: string, channelId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const channel = guild.channels.cache.get(channelId);
    if (!channel) throw new NotFoundException('Channel not found');
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    const guildConnection = this.guildConnectionService.get(guildId);
    guildConnection.connection = connection;
    connection.subscribe(guildConnection.player);
    this.guildConnectionService.set(guildId, guildConnection);
    return { message: 'Joined voice channel', statusCode: 200 };
  }

  async leave(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (connection.connection) connection.connection.destroy();
    connection.connection = null;
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Left voice channel', statusCode: 200 };
  }

  async searchYoutube(prompt: string) {
    const results = await player.search(prompt, {
      source: { youtube: 'video' },
      limit: 15,
    });
    return results;
  }

  async addSong(id: string, guildId: string, url: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    const [song] = await player.search(url, {
      source: { youtube: 'video' },
    });
    const requester = await this.userService.getMe(id);
    connection.queue.push({
      title: song.title,
      author: song.channel.name,
      url: song.url,
      thumbnail: song.thumbnails[0].url,
      duration: song.durationInSec,
      raw_duration: song.durationRaw,
      requester_id: requester.id,
      requester_name: requester.global_name,
    });
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Added song to queue', statusCode: 200 };
  }

  async removeSong(guildId: string, index: number) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (index == connection.currentIndex) {
      connection.player.pause();
      connection.state = 'idle';
      connection.currentIndex = -1;
    } else if (index < connection.currentIndex && connection.currentIndex > 0)
      connection.currentIndex--;
    connection.queue.splice(index, 1);
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Removed song from queue', statusCode: 200 };
  }

  getUpdates(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const voices = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
    const currentVoice = guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildVoice &&
        channel.members.has(this.client.user.id),
    );
    const guildConnection = this.guildConnectionService.get(guildId);
    return {
      id: guild.id,
      voices: voices,
      currentVoice: currentVoice,
      queue: guildConnection.queue,
      currentIndex: guildConnection.currentIndex,
      state: guildConnection.state,
      loopState: guildConnection.loopState,
      volume: guildConnection.volume,
      seek:
        guildConnection.stream?.playbackDuration + guildConnection.seek * 1000,
    };
  }
}
