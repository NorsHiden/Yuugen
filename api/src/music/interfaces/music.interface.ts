export interface IMusicService {
  join(guildId: string, channelId: string): Promise<void>;
  leave(guildId: string): Promise<void>;
  play(guildId: string, song: string): Promise<void>;
  seek(guildId: string, position: number): Promise<void>;
  pause(guildId: string): Promise<void>;
  resume(guildId: string): Promise<void>;
  previous(guildId: string): Promise<void>;
  skip(guildId: string): Promise<void>;
  stop(guildId: string): Promise<void>;
  volume(guildId: string, volume: number): Promise<void>;
  shuffle(guildId: string): Promise<void>;
  loop(guildId: string): Promise<void>;
  removeSong(guildId: string, index: number): Promise<void>;
  clearQueue(guildId: string): Promise<void>;
  getQueue(guildId: string): Promise<void>;
  current(guildId: string): Promise<void>;
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
