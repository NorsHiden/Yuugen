import { YouTubeVideo } from "./YoutubeVideo";

export type YouTubePlayList = {
  /**
   * YouTube Playlist ID
   */
  id?: string;
  /**
   * YouTube Playlist Name
   */
  title?: string;
  /**
   * YouTube Class type. == "playlist"
   */
  type: "video" | "playlist" | "channel";
  /**
   * Total no of videos in that playlist
   */
  videoCount?: number;
  /**
   * Total views of that playlist
   */
  views?: number;
  /**
   * YouTube Playlist url
   */
  url?: string;
  /**
   * YouTube Playlist url with starting video url.
   */
  channel?: {
    /**
     * YouTube Channel Title
     */
    name?: string;
    /**
     * YouTube Channel Verified status.
     */
    verified?: boolean;
    /**
     * YouTube Channel artist if any.
     */
    artist?: boolean;
    /**
     * YouTube Channel ID.
     */
    id?: string;
    /**
     * Type of Class [ Channel ]
     */
    type: "video" | "playlist" | "channel";
    /**
     * YouTube Channel Url
     */
    url?: string;
    /**
     * YouTube Channel subscribers count.
     */
    subscribers?: string;
  };
  /**
   * YouTube Playlist thumbnail Data
   */
  thumbnail?: {
    url: string;
  };

  videos?: YouTubeVideo[];
};
