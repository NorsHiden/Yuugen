import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ChannelType,
  Client,
  Collection,
  Guild as DiscordGuild,
  GuildBasedChannel,
} from 'discord.js';
import { Guild } from 'src/db/entities/guilds.entity';
import { Music } from 'src/db/entities/music.entity';
import { Settings } from 'src/db/entities/settings.entity';
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
    this.client.guilds.cache.forEach(async (guild) => {
      const guildConnection = await this.find(guild.id);
      if (!guildConnection) {
        const newGuild = new Guild();
        newGuild.id = guild.id;
        newGuild.admins = [];
        newGuild.mods = [];
        newGuild.music = new Music();
        newGuild.settings = new Settings();
        await this.create(newGuild);
      }
    });
    this.client.on('guildCreate', async (guild) => {
      const guildConnection = await this.find(guild.id);
      if (!guildConnection) {
        const newGuild = new Guild();
        newGuild.id = guild.id;
        newGuild.admins = [];
        newGuild.mods = [];
        newGuild.music = new Music();
        newGuild.settings = new Settings();
        await this.create(newGuild);
      }
    });
    this.client.on('guildDelete', async (guild) => {
      await this.delete(guild.id);
    });
  }

  async find(id: string): Promise<Guild> {
    return await this.guildRepository.findOneBy({ id: id });
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

  async getCommonGuilds(
    user_id: string,
  ): Promise<Collection<string, DiscordGuild>> {
    const user = this.client.users.cache.get(user_id);
    if (!user) throw new NotFoundException('User not found');
    const commonGuilds = this.client.guilds.cache.filter(async (guild) => {
      await guild.members.fetch();
      return guild.members.cache.has(user.id);
    });
    return commonGuilds;
  }

  getVoices(guildId: string): Collection<string, GuildBasedChannel> {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
    return voiceChannels;
  }

  getCurrentVoice(guildId: string): GuildBasedChannel {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannel = guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildVoice &&
        channel.members.has(this.client.user.id),
    );
    return voiceChannel;
  }

  async addAdmin(id: string, user: User): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['admins'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.admins.push(user);
    return await this.guildRepository.save(guild);
  }

  async removeAdmin(id: string, user: User): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['admins'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.admins = guild.admins.filter((admin) => admin.id !== user.id);
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
