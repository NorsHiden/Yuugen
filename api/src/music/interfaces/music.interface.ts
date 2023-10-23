import { Song } from 'src/db/entities/song.entity';

export interface IMusicService {
  join(guild_id: string, channelId: string): Promise<void>;
  leave(guild_id: string): Promise<void>;
  addSong(
    user_id: string,
    guild_id: string,
    url: string,
    searchOptions: SearchOptions,
  ): Promise<Song>;
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
}

export interface SearchOptions {
  limit?: number;
  source?: {
    youtube?: 'video' | 'playlist' | 'channel';
    spotify?: 'album' | 'playlist' | 'track';
    soundcloud?: 'tracks' | 'playlists' | 'albums';
    deezer?: 'track' | 'playlist' | 'album';
  };
  fuzzy?: boolean;
  language?: string;
  /**
   * !!! Before enabling this for public servers, please consider using Discord features like NSFW channels as not everyone in your server wants to see NSFW images. !!!
   * Unblurred images will likely have different dimensions than specified in the {@link YouTubeThumbnail} objects.
   */
  unblurNSFWThumbnails?: boolean;
}
