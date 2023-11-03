import {
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
  currentVoiceChannel: GuildBasedChannel;
  voiceChannelMembers: Collection<string, GuildMember> | ThreadMemberManager;
  queue: Song[];
  currentSong: number;
  volume: number;
  state: 'playing' | 'paused' | 'stopped';
  loop: 'off' | 'queue' | 'song';
}
