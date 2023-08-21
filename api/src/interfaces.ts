import { VoiceConnection } from '@discordjs/voice';
import { Channel, Collection, GuildBasedChannel } from 'discord.js';

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
  voices: Collection<string, GuildBasedChannel>;
  currentVoice: Channel;
  queue: Song[];
  currentIndex: number;
  state: 'playing' | 'paused' | 'idle';
}

export interface MessageEvent {
  data: GuildUpdate;
}

export interface GuildConnection {
  connection: VoiceConnection;
  queue: Song[];
  volume: number;
  state: 'playing' | 'paused' | 'idle';
  currentIndex: number;
}

export interface UserMe {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  global_name: string;
}
