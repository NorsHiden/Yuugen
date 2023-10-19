import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'discord.js';
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

  async addMusic(id: string, music: Music): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['music'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.music = music;
    return await this.guildRepository.save(guild);
  }

  async removeMusic(id: string): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['music'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.music = null;
    return await this.guildRepository.save(guild);
  }

  async addSettings(id: string, settings: Settings): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['settings'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.settings = settings;
    return await this.guildRepository.save(guild);
  }

  async removeSettings(id: string): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { id: id },
      relations: ['settings'],
    });
    if (!guild) throw new NotFoundException('Guild not found');
    guild.settings = null;
    return await this.guildRepository.save(guild);
  }
}
