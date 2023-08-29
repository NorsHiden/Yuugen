import { joinVoiceChannel } from '@discordjs/voice';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';
import { GuildConnectionService } from './guild-connection.service';
import player from 'play-dl';
import { UserService } from 'src/user/services/user.service';
import axios from 'axios';

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

  async searchYoutube(prompt: string, type: string) {
    if (!prompt) throw new NotFoundException('Prompt not found');
    if (type !== 'video' && type !== 'playlist')
      throw new NotFoundException('Type not found');
    const results = await player.search(prompt, {
      source: { youtube: type },
    });
    if (!results.length && type === 'playlist') {
      const playlist = await player.playlist_info(prompt);
      return [playlist];
    }
    return results;
  }

  async addSong(id: string, guildId: string, url: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    const song = await player.video_info(url);
    let thumbnail = song.video_details.thumbnails[0].url
      .split('?')[0]
      .replace('hqdefault', 'maxresdefault');
    try {
      await axios.get(thumbnail);
    } catch {
      thumbnail = song.video_details.thumbnails[0].url;
    }
    const requester = await this.userService.getMe(id);
    connection.queue.push({
      title: song.video_details.title,
      author: song.video_details.channel.name,
      url: song.video_details.url,
      thumbnail: thumbnail,
      duration: song.video_details.durationInSec,
      raw_duration: song.video_details.durationRaw,
      requester_id: requester.id,
      requester_name: requester.global_name,
    });
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Added song to queue', statusCode: 200 };
  }

  async addPlaylist(id: string, guildId: string, url: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    const songs = await (await player.playlist_info(url)).all_videos();
    const requester = await this.userService.getMe(id);
    songs.forEach(async (song) => {
      const [research] = await player.search(song.url, {
        source: { youtube: 'video' },
      });
      connection.queue.push({
        title: song.title,
        author: song.channel.name,
        url: song.url,
        thumbnail: research.thumbnails[0].url,
        duration: song.durationInSec,
        raw_duration: song.durationRaw,
        requester_id: requester.id,
        requester_name: requester.global_name,
      });
    });
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Added playlist to queue', statusCode: 200 };
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

  async move(guildId: string, oldIndex: number, newIndex: number) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    if (oldIndex == connection.currentIndex) {
      connection.currentIndex = newIndex;
    } else if (
      oldIndex < connection.currentIndex &&
      newIndex >= connection.currentIndex
    )
      connection.currentIndex--;
    else if (
      oldIndex > connection.currentIndex &&
      newIndex <= connection.currentIndex
    )
      connection.currentIndex++;
    const [song] = connection.queue.splice(oldIndex, 1);
    connection.queue.splice(newIndex, 0, song);
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Moved song in queue', statusCode: 200 };
  }

  clearQueue(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guildConnectionService.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    connection.queue = [];
    connection.currentIndex = -1;
    connection.player.pause();
    connection.state = 'idle';
    this.guildConnectionService.set(guildId, connection);
    return { message: 'Cleared queue', statusCode: 200 };
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
