import { Injectable, NotFoundException } from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';
import { GuildUpdate } from '../../interfaces';
import { GuildConnectionService } from 'src/voice/services/guild-connection.service';

@Injectable()
export class GuildService {
  constructor(private readonly client: Client) {}

  async getVoices(guildId: string): Promise<any> {
    // need to be more protected...
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
    return voiceChannels;
  }

  async getCurrentVoice(guildId: string): Promise<any> {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const voiceChannel = guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildVoice &&
        channel.members.has(this.client.user.id),
    );
    return voiceChannel;
  }
}
