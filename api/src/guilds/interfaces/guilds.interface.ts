import { Guild } from 'src/db/entities/guilds.entity';
import {
  Collection,
  Guild as DiscordGuild,
  GuildBasedChannel,
} from 'discord.js';

export interface IGuildsService {
  onApplicationBootstrap(): Promise<void>;
  find(id: string): Promise<Guild>;
  create(guild: Guild): Promise<Guild>;
  update(guild: Guild): Promise<Guild>;
  delete(id: string): Promise<void>;
  getCommonGuilds(id: string): Promise<Collection<string, DiscordGuild>>;
  getVoices(id: string): Collection<string, GuildBasedChannel>;
  getCurrentVoice(id: string): GuildBasedChannel;
  // setPrefix(id: string, prefix: string): Promise<Guild>;
  // setDJRole(id: string, role: Role): Promise<Guild>;
  // setModRole(id: string, role: Role): Promise<Guild>;
  // setAdminRole(id: string, role: Role): Promise<Guild>;
  // setMusicChannel(id: string, channel: Channel): Promise<Guild>;
  // setWelcomeChannel(id: string, channel: Channel): Promise<Guild>;
  // setWelcomeMessage(id: string, message: string): Promise<Guild>;
  // setLeaveChannel(id: string, channel: Channel): Promise<Guild>;
  // setLeaveMessage(id: string, message: string): Promise<Guild>;
}
