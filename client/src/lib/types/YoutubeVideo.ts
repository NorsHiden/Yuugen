export type YouTubeVideo = {
  /**
   * YouTube Video ID
   */
  id?: string;
  /**
   * YouTube video url
   */
  url: string;
  /**
   * YouTube Class type. == "video"
   */
  type: "video" | "playlist" | "channel";
  /**
   * YouTube Video title
   */
  title?: string;
  /**
   * YouTube Video description.
   */
  description?: string;
  /**
   * YouTube Video Duration Formatted
   */
  durationRaw: string;
  /**
   * YouTube Video Duration in seconds
   */
  durationInSec: number;
  /**
   * YouTube Video Uploaded Date
   */
  uploadedAt?: string;
  /**
   * YouTube Views
   */
  views: number;
  /**
   * YouTube Thumbnail Data
   */
  thumbnail: {
    url: string;
  };
  /**
   * YouTube Video's uploader Channel Data
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
   * YouTube Video's likes
   */
  likes: number;
};
