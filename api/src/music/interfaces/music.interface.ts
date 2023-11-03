import { YouTubePlayList, YouTubeVideo } from 'play-dl';
import { MusicUpdate } from './musicupdate.interface';
import { SearchOptions } from './searchoptions.interface';
import { Song } from './song.interface';

export interface IMusicService {
  join(guild_id: string, channelId: string): Promise<void>;
  leave(guild_id: string): Promise<void>;
  addSong(
    user_id: string,
    guild_id: string,
    url: string,
    platform: string,
    type: string,
  ): Promise<Song>;
  getRequester(
    user_id: string,
    guild_id: string,
  ): {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
  removeSong(guild_id: string, index: number): Promise<Song>;
  play(guild_id: string, index: number, seek?: number): Promise<Song>;
  stop(guild_id: string): Promise<Song>;
  pause(guild_id: string): Promise<Song>;
  resume(guild_id: string): Promise<Song>;
  volume(guild_id: string, volume: number): Promise<{ volume: number }>;
  shuffle(guild_id: string): Promise<Song[]>;
  loop(guild_id: string): Promise<{ loop: 'off' | 'queue' | 'song' }>;
  getQueue(guild_id: string): Promise<Song[]>;
  clearQueue(guild_id: string): Promise<Song[]>;
  current(guild_id: string): Promise<Song>;
  search(
    query: string,
    options: string,
  ): Promise<YouTubeVideo[] | YouTubePlayList[]>;
  serverMusicUpdates(guild_id: string): Promise<MusicUpdate>;
}
