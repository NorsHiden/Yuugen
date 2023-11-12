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
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';
import { IGuildsService } from 'src/guilds/interfaces/guilds.interface';
import Services from 'src/utils/services';
import * as player from 'play-dl';
import IUsersService from 'src/users/interfaces/users.interface';
import { Song } from '../interfaces/song.interface';
import { ConfigService } from '@nestjs/config';
import { MusicUpdate } from '../interfaces/musicupdate.interface';

type guildMusic = {
  connection: VoiceConnection;
  player: AudioPlayer;
  stream: AudioResource<null>;
  queue: Song[];
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
    private readonly configService: ConfigService,
    private readonly client: Client,
  ) {
    this.client.on('voiceStateUpdate', async (oldState, newState) => {
      // if bot changed voice channel
    });
    this.client.on('ready', async () => {
      await player.setToken({
        spotify: {
          client_id: this.configService.get<string>('SPOTIFY_CLIENT_ID'),
          client_secret: this.configService.get<string>(
            'SPOTIFY_CLIENT_SECRET',
          ),
          refresh_token: this.configService.get<string>(
            'SPOTIFY_REFRESH_TOKEN',
          ),
          market: 'US',
        },
      });
      this.client.guilds.cache.forEach(async (guildDiscord) => {
        this.guildsMusic.set(guildDiscord.id, {
          connection: null,
          player: createAudioPlayer({
            behaviors: {
              noSubscriber: NoSubscriberBehavior.Pause,
            },
          }),
          stream: null,
          queue: [],
          loop: 'off',
          volume: 100,
          state: 'stopped',
          current: -1,
          seekStart: 0,
        });
        const guildMusic = this.guildsMusic.get(guildDiscord.id);
        guildMusic.player.on('stateChange', async (oldState, newState) => {
          if (newState.status === 'idle') {
            if (guildMusic.loop === 'off') {
              guildMusic.current = -1;
              guildMusic.stream = null;
              guildMusic.state = 'stopped';
            } else if (guildMusic.loop === 'queue') {
              guildMusic.current =
                (guildMusic.current + 1) % guildMusic.queue.length;
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
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.connection) guildMusic.connection.destroy();
    guildMusic.connection = null;
    return {};
  }

  getQueue(guild_id: string): Song[] {
    const guildsMusic = this.guildsMusic.get(guild_id);
    if (!guildsMusic) throw new NotFoundException('Guild not found');
    return guildsMusic.queue;
  }

  getRequester(
    user_id: string,
    guild_id: string,
  ): {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  } {
    const user = this.client.guilds.cache
      .get(guild_id)
      .members.cache.get(user_id);
    if (!user) throw new NotFoundException('User not found');
    return {
      id: user.id,
      username: user.user.username,
      discriminator: user.user.discriminator,
      avatar: user.user.avatar,
    };
  }

  async addSong(
    user_id: string,
    guild_id: string,
    url: string,
    platform: string,
    type: string,
  ): Promise<Song> {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (platform === 'youtube' && type !== 'video' && type !== 'playlist')
      throw new ForbiddenException('Type must be video or playlist');
    if (
      platform !== 'youtube' &&
      type !== 'track' &&
      type !== 'playlist' &&
      type !== 'album'
    )
      throw new ForbiddenException('Type must be track or playlist');
    const [result] = (await player.search(url, {
      source:
        platform === 'youtube'
          ? {
              youtube: type as 'playlist' | 'video',
            }
          : {
              spotify: type as 'track' | 'playlist' | 'album',
            },
    })) as any;
    if (!result) throw new NotFoundException('Song not found');
    if (type == 'playlist') {
      result.map((single) => guildMusic.queue.push(single));
    } else {
      const song: Song = {
        title: result.title,
        author: result.channel.name,
        url: result.url,
        duration: result.durationInSec,
        thumbnail: result.thumbnails[0].url,
        timestamp_added: new Date(),
        requester: this.getRequester(user_id, guild_id),
      };
      guildMusic.queue.push(song);
      return song;
    }
  }

  async removeSong(guild_id: string, index: number) {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guildMusic.queue.splice(index, 1);
    if (guildMusic.current === index) {
      await this.stop(guild_id);
    }
    return {};
  }

  async clearQueue(guild_id: string): Promise<Song[]> {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guildMusic.queue = [];
    if (guildMusic.current !== -1) await this.stop(guild_id);
    return guildMusic.queue;
  }

  async play(guild_id: string, index: number, seek: number = 0): Promise<Song> {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.connection === null)
      throw new NotFoundException('Not connected to a voice channel');
    if (index < 0 || index >= guildMusic.queue.length)
      throw new NotFoundException('Song not found');
    const song = guildMusic.queue[index];
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
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.state != 'playing')
      return guildMusic.queue[guildMusic.current];
    guildMusic.player.pause();
    guildMusic.state = 'paused';
    return guildMusic.queue[guildMusic.current];
  }

  async resume(guild_id: string): Promise<Song> {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    if (guildMusic.state != 'paused')
      return guildMusic.queue[guildMusic.current];
    guildMusic.player.unpause();
    guildMusic.state = 'playing';
    return guildMusic.queue[guildMusic.current];
  }

  async volume(guild_id: string, volume: number): Promise<{ volume: number }> {
    if (volume < 0 || volume > 100)
      throw new NotFoundException('Volume must be between 0 and 100');
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild music not found');
    guildMusic.volume = volume;
    if (guildMusic.stream) guildMusic.stream.volume.setVolume(volume / 100);
    return { volume: volume };
  }

  shuffle(guild_id: string): Song[] {
    const guildsMusic = this.guildsMusic.get(guild_id);
    if (!guildsMusic) throw new NotFoundException('Guild not found');
    const songs = guildsMusic.queue;
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    guildsMusic.queue = songs;
    return songs;
  }

  async loop(guild_id: string): Promise<{ loop: 'off' | 'queue' | 'song' }> {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic) throw new NotFoundException('Guild not found');
    if (guildMusic.loop === 'off') guildMusic.loop = 'queue';
    else if (guildMusic.loop === 'queue') guildMusic.loop = 'song';
    else guildMusic.loop = 'off';
    return { loop: guildMusic.loop };
  }

  async search(
    query: string,
    options: string,
  ): Promise<player.YouTubeVideo[] | player.YouTubePlayList[]> {
    if (options !== 'video' && options !== 'playlist')
      throw new ForbiddenException('Options must be video or playlist');
    return await player.search(query, {
      source: {
        youtube: options,
      },
    });
  }

  serverMusicUpdates(guild_id: string): MusicUpdate {
    const guildMusic = this.guildsMusic.get(guild_id);
    if (!guildMusic)
      return {
        guildId: new Date().getSeconds().toString(),
      } as MusicUpdate;
    const currentVoiceChannel: any =
      this.guildsService.getCurrentVoice(guild_id);
    return {
      guildId: guild_id,
      voiceChannels: this.guildsService.getVoices(guild_id),
      currentVoiceChannel: currentVoiceChannel,
      queue: guildMusic.queue,
      currentSong: guildMusic.current,
      state: guildMusic.state,
      loop: guildMusic.loop,
      volume: guildMusic.volume,
      voiceChannelMembers: currentVoiceChannel.members,
    };
  }
}
