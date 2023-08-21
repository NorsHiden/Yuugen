import {
  AudioPlayer,
  AudioResource,
  VoiceConnection,
  createAudioPlayer,
} from '@discordjs/voice';
import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { Song } from 'src/interfaces';

interface GuildConnection {
  connection: VoiceConnection | null;
  player: AudioPlayer | null;
  stream: AudioResource<null> | null;
  queue: Song[];
  volume: number;
  state: 'playing' | 'paused' | 'idle';
  currentIndex: number;
  isLooping: boolean;
}

const defaultGuildConnection = (): GuildConnection => ({
  connection: null,
  player: createAudioPlayer(),
  stream: null,
  queue: [],
  volume: 100,
  state: 'idle',
  currentIndex: 0,
  isLooping: false,
});

@Injectable()
export class GuildConnectionService {
  private readonly guildConnections = new Map<string, GuildConnection>();
  constructor(private readonly client: Client) {}

  async onApplicationBootstrap(): Promise<void> {
    this.client.guilds.cache.forEach(async (guild) => {
      this.guildConnections.set(guild.id, defaultGuildConnection());
    });
    this.client.on('guildCreate', async (guild) => {
      this.guildConnections.set(guild.id, defaultGuildConnection());
    });
    this.client.on('guildDelete', async (guild) => {
      this.guildConnections.delete(guild.id);
    });
  }

  get(guildId: string): GuildConnection {
    return this.guildConnections.get(guildId);
  }

  set(guildId: string, guildConnection: GuildConnection): void {
    this.guildConnections.set(guildId, guildConnection);
  }

  delete(guildId: string): void {
    this.guildConnections.delete(guildId);
  }

  has(guildId: string): boolean {
    return this.guildConnections.has(guildId);
  }

  clear(): void {
    this.guildConnections.clear();
  }

  get size(): number {
    return this.guildConnections.size;
  }
}
