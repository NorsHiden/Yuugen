import {
  AudioPlayer,
  AudioResource,
  NoSubscriberBehavior,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import {
  ConsoleLogger,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Channel, ChannelType, Client } from 'discord.js';
import { Song } from 'src/db/entities/song.entity';
import { IGuildsService } from 'src/guilds/interfaces/guilds.interface';
import Services from 'src/utils/services';
import * as player from 'play-dl';
import { SearchOptions } from '../interfaces/music.interface';
import IUsersService from 'src/users/interfaces/users.interface';
import { create } from 'domain';

type guildMusic = {
  connection: VoiceConnection;
  player: AudioPlayer;
  stream: AudioResource<null>;
  loop: 'off' | 'queue' | 'song';
  volume: number;
  state: 'playing' | 'paused' | 'stopped';
  current: number;
  seekStart: number;
};

@Injectable()
export class MusicService {
  private readonly guildsMusic = new Map<string, guildMusic>();
  constructor(
    @Inject(Services.GUILDS) private readonly guildsService: IGuildsService,
    @Inject(Services.USERS) private readonly usersService: IUsersService,
    private readonly client: Client,
  ) {
    this.client.on('voiceStateUpdate', async (oldState, newState) => {
      // if bot changed voice channel
    });
    this.client.on('ready', async () => {
      this.client.guilds.cache.forEach(async (guildDiscord) => {
        this.guildsMusic.set(guildDiscord.id, {
          connection: null,
          player: createAudioPlayer({
            behaviors: {
              noSubscriber: NoSubscriberBehavior.Pause,
            },
          }),
          stream: null,
          loop: 'off',
          volume: 100,
          state: 'stopped',
          current: -1,
          seekStart: 0,
        });
        const guildMusic = this.guildsMusic.get(guildDiscord.id);
        const guild = await this.guildsService.find(guildDiscord.id);
        guildMusic.player.on('stateChange', async (oldState, newState) => {
          if (newState.status === 'idle') {
            if (guildMusic.loop === 'off') {
              guildMusic.current = -1;
              guildMusic.stream = null;
              guildMusic.state = 'stopped';
            } else if (guildMusic.loop === 'queue') {
              guildMusic.current =
                (guildMusic.current + 1) % guild.music.songs.length;
              await this.play(guildDiscord.id, guildMusic.current);
            } else if (guildMusic.loop === 'song')
              await this.play(guildDiscord.id, guildMusic.current);
          }
        });
      });
    });
  }

  async join(guild_id: string, channel_id: string) {
    const guild = this.client.guilds.cache.get(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const channel = this.client.channels.cache.get(channel_id);
    if (!channel) throw new NotFoundException('Channel not found');
    if (channel.type !== ChannelType.GuildVoice) {
      throw new NotFoundException('Channel is not a voice channel');
    }
    const guildMusic = this.guildsMusic.get(guild_id);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    if (guildMusic.player) connection.subscribe(guildMusic.player);
    guildMusic.connection = connection;
    return channel;
  }

  async leave(guild_id: string) {
    const guild = this.client.guilds.cache.get(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.connection) guildMusic.connection.destroy();
    guildMusic.connection = null;
    return {};
  }

  async getQueue(guild_id: string): Promise<Song[]> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    return guild.music.songs;
  }

  async addSong(
    user_id: string,
    guild_id: string,
    url: string,
    searchOptions: SearchOptions,
  ): Promise<Song> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    const [result] = await player.search(url, searchOptions);
    if (!result) throw new NotFoundException('Song not found');
    const song = new Song();
    song.title = result.title;
    song.author = result.channel.name;
    song.url = result.url;
    song.duration = result.durationInSec;
    song.thumbnail = result.thumbnails[0].url;
    song.timestamp_added = new Date();
    song.requester = await this.usersService.find(user_id);
    guild.music.songs.push(song);
    await this.guildsService.update(guild);
    console.log(guild);
    return song;
  }

  async removeSong(guild_id: string, index: number) {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guild.music.songs.splice(index, 1);
    await this.guildsService.update(guild);
    if (guildMusic.current === index) {
      await this.stop(guild_id);
    }
    return {};
  }

  async clearQueue(guild_id: string): Promise<Song[]> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guild.music.songs = [];
    await this.guildsService.update(guild);
    if (guildMusic.current !== -1) await this.stop(guild_id);
    return await this.guildsService
      .find(guild_id)
      .then((guild) => guild.music.songs);
  }

  async play(guild_id: string, index: number, seek: number = 0): Promise<Song> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.connection === null)
      throw new NotFoundException('Not connected to a voice channel');
    if (index < 0 || index >= guild.music.songs.length)
      throw new NotFoundException('Song not found');
    const song = guild.music.songs[index];
    guildMusic.current = index;
    const stream = await player.stream(song.url, {
      quality: 3,
      seek: seek,
    });
    guildMusic.seekStart = 0;
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      inlineVolume: true,
    });
    guildMusic.stream = resource;
    guildMusic.stream.volume.setVolume(guildMusic.volume / 100);
    guildMusic.player.play(resource);
    guildMusic.stream = resource;
    resource.volume.setVolume(guildMusic.volume / 100);
    guildMusic.state = 'playing';
    return song;
  }

  async stop(guild_id: string): Promise<Song> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guildMusic.player.stop();
    guildMusic.state = 'stopped';
    guildMusic.current = -1;
    return {} as Song;
  }

  async pause(guild_id: string): Promise<Song> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.state != 'playing')
      return guild.music.songs[guildMusic.current];
    guildMusic.player.pause();
    guildMusic.state = 'paused';
    return guild.music.songs[guildMusic.current];
  }

  async resume(guild_id: string): Promise<Song> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.state != 'paused')
      return guild.music.songs[guildMusic.current];
    guildMusic.player.unpause();
    guildMusic.state = 'playing';
    return guild.music.songs[guildMusic.current];
  }

  async volume(guild_id: string, volume: number): Promise<{ volume: number }> {
    if (volume < 0 || volume > 100)
      throw new NotFoundException('Volume must be between 0 and 100');
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guildMusic.volume = volume;
    if (guildMusic.stream) guildMusic.stream.volume.setVolume(volume / 100);
    return { volume: volume };
  }

  async shuffle(guild_id: string): Promise<Song[]> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const songs = guild.music.songs;
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    guild.music.songs = songs;
    await this.guildsService.update(guild);
    return songs;
  }

  async loop(guild_id: string): Promise<{ loop: 'off' | 'queue' | 'song' }> {
    const guild = await this.guildsService.find(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (guildMusic.loop === 'off') guildMusic.loop = 'queue';
    else if (guildMusic.loop === 'queue') guildMusic.loop = 'song';
    else guildMusic.loop = 'off';
    return { loop: guildMusic.loop };
  }
}
