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
  getCommonGuilds(user_id: string): Promise<Collection<string, DiscordGuild>>;
  getVoices(guild_id: string): Promise<Collection<string, GuildBasedChannel>>;
  getCurrentVoice(guild_id: string): Promise<GuildBasedChannel>;
}
