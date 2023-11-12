import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Channel,
  ChannelType,
  Client,
  Collection,
  Guild as DiscordGuild,
  GuildBasedChannel,
  VoiceChannel,
} from 'discord.js';
import { Guild } from 'src/db/entities/guilds.entity';
import { Music } from 'src/db/entities/music.entity';
import { User } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { IGuildsService } from '../interfaces/guilds.interface';

@Injectable()
export class GuildsService implements IGuildsService {
  constructor(
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
    private readonly client: Client,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.client.once('ready', async () => {
      this.client.guilds.cache.forEach(async (guild) => {
        const guildConnection = await this.find(guild.id);
        if (!guildConnection) {
          const newGuild = new Guild();
          newGuild.id = guild.id;
          newGuild.djs = [];
          newGuild.mods = [];
          newGuild.music = new Music();
          await this.create(newGuild);
        }
      });
    });
    this.client.on('guildCreate', async (guild) => {
      const guildConnection = await this.find(guild.id);
      if (!guildConnection) {
        const newGuild = new Guild();
        newGuild.id = guild.id;
        newGuild.djs = [];
        newGuild.mods = [];
        newGuild.music = new Music();
        await this.create(newGuild);
      }
    });
    this.client.on('guildDelete', async (guild) => {
      await this.delete(guild.id);
    });
  }

  async find(id: string): Promise<Guild> {
    return await this.guildRepository.findOne({
      where: { id: id },
      relations: ['djs', 'mods', 'music'],
    });
  }

  async create(guild: Guild): Promise<Guild> {
    return await this.guildRepository.save(guild);
  }

  async update(guild: Guild): Promise<Guild> {
    return await this.guildRepository.save(guild);
  }

  async delete(id: string): Promise<void> {
    await this.guildRepository.delete(id);
  }

  async getGuilds(): Promise<Collection<string, DiscordGuild>> {
    await this.client.guilds.fetch();
    return this.client.guilds.cache;
  }

  async getCommonGuilds(
    userId: string,
  ): Promise<Collection<string, DiscordGuild>> {
    const user = this.client.users.cache.get(userId);
    if (!user) throw new NotFoundException('User not found');
    const commonGuilds = this.client.guilds.cache.filter(async (guild) => {
      await guild.members.fetch();
      return guild.members.cache.has(user.id);
    });
    return commonGuilds;
  }

  getVoices(guild_id: string): Collection<string, GuildBasedChannel> {
    const guild = this.client.guilds.cache.find(
      (guild) => guild.id === guild_id,
    );
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
    return voiceChannels;
  }

  getCurrentVoice(guild_id: string): Channel {
    const guild = this.client.guilds.cache.get(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannel = guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildVoice &&
        channel.members.has(this.client.user.id),
    );
    return voiceChannel || ({} as Channel);
  }

  async addDj(id: string, user: User): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['djs'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.djs.push(user);
    return await this.guildRepository.save(guild);
  }

  async removeDj(id: string, user: User): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['djs'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.djs = guild.djs.filter((admin) => admin.id !== user.id);
    return await this.guildRepository.save(guild);
  }

  async addMod(id: string, user: User): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['mods'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.mods.push(user);
    return await this.guildRepository.save(guild);
  }

  async removeMod(id: string, user: User): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['mods'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.mods = guild.mods.filter((mod) => mod.id !== user.id);
    return await this.guildRepository.save(guild);
  }
}
