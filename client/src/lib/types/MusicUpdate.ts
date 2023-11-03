import {
  Collection,
  GuildBasedChannel,
  GuildMember,
  ThreadMemberManager,
} from "discord.js";

type Song = {
  title: string;

  author: string;

  url: string;

  thumbnail: string;

  duration: number;

  requester: {
    id: string;
    username: string;
    avatar: string;
  };

  timestamp_added: Date;
};

export type MusicUpdate = {
  guildId: string;
  voiceChannels: Collection<string, GuildBasedChannel>;
  currentVoiceChannel: GuildBasedChannel;
  voiceChannelMembers: Collection<string, GuildMember> | ThreadMemberManager;
  queue: Song[];
  currentSong: number;
  volume: number;
  state: "playing" | "paused" | "stopped";
  loop: "off" | "queue" | "song";
};
