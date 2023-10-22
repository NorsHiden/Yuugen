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
import { Song } from 'src/db/entities/song.entity';

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
        newGuild.music.songs = [];
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
    return await this.guildRepository.findOne({
      where: { id: id },
      relations: ['admins', 'mods', 'music', 'music.songs', 'settings'],
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

  async getVoices(
    guild_id: string,
  ): Promise<Collection<string, GuildBasedChannel>> {
    await this.client.guilds.fetch();
    const guild = this.client.guilds.cache.find(
      (guild) => guild.id === guild_id,
    );
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
    return voiceChannels;
  }

  async getCurrentVoice(guild_id: string): Promise<GuildBasedChannel> {
    await this.client.guilds.fetch();
    const guild = this.client.guilds.cache.get(guild_id);
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannel = guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildVoice &&
        channel.members.has(this.client.user.id),
    );
    return voiceChannel || ({} as GuildBasedChannel);
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

  async getQueue(id: string): Promise<Song[]> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['music', 'music.songs'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    return guild.music.songs;
  }

  async setQueue(id: string, queue: Song[]): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['music', 'music.songs'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.music.songs = queue;
    return await this.guildRepository.save(guild);
  }

  async setPrefix(id: string, prefix: string): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['settings'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.settings.prefix = prefix;
    return await this.guildRepository.save(guild);
  }
}
