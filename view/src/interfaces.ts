export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
  permissions_new: string;
}

export interface Channel {
  id: string;
  name: string;
  type: number;
  guild_id: string;
  position: number;
  permission_overwrites: any[];
  rate_limit_per_user: number;
  nsfw: boolean;
  topic: string;
  raw_position: number;
  parent_id: string;
  last_message_id: string;
  bitrate: number;
  user_limit: number;
  rtc_region: string;
  video_quality_mode: number;
  message_count: number;
  member_count: number;
  thread_metadata: any;
  member: any;
  default_auto_archive_duration: number;
  permissions: string;
}

export interface Song {
  title: string;
  author: string;
  url: string;
  thumbnail: string;
  duration: number;
  raw_duration: string;
  requester_id: string;
  requester_name: string;
}

export interface GuildUpdate {
  id: string;
  voices: Channel[];
  currentVoice: Channel;
  queue: Song[];
  currentIndex: number;
  state: 'playing' | 'paused' | 'idle';
}