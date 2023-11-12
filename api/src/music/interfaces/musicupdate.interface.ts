import {
  Channel,
  Collection,
  GuildBasedChannel,
  GuildMember,
  ThreadMemberManager,
  VoiceChannel,
} from 'discord.js';
import { Song } from './song.interface';

export interface MusicUpdate {
  guildId: string;
  voiceChannels: Collection<string, GuildBasedChannel>;
  currentVoiceChannel: any;
  voiceChannelMembers: {
    id: string;
    bot: boolean;
    system: boolean;
    username: string;
    globalName: string;
    discriminator: string;
    avatar: string;
  }[];
  queue: Song[];
  currentSong: number;
  volume: number;
  state: 'playing' | 'paused' | 'stopped';
  loop: 'off' | 'queue' | 'song';
}
