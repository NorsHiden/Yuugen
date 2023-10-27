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
