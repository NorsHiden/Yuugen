import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Client } from 'discord.js';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly client: Client,
  ) {}

  async getRefreshToken(user: User): Promise<User> {
    const response = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: this.configService.get('CLIENT_ID'),
        client_secret: this.configService.get('CLIENT_SECRET'),
        grant_type: 'refresh_token',
        refresh_token: user.refresh_token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    user.access_token = response.data.access_token;
    user.refresh_token = response.data.refresh_token;
    await this.userRepository.save(user);
    return user;
  }

  async getMe(id: string): Promise<User> {
    const userDb = await this.userRepository.findOneBy({ id: id });

    if (!userDb) throw new NotFoundException('User not found');
    try {
      const user = await axios.get(`https://discord.com/api/users/@me`, {
        headers: {
          Authorization: `Bearer ${userDb.access_token}`,
        },
      });
      return user.data;
    } catch (err) {
      if (err.response.status === 401) {
        await this.getRefreshToken(userDb);
        return this.getMe(id);
      }
      throw new HttpException(err.response.data, err.response.status);
    }
  }

  async getCommonGuilds(id: string): Promise<any> {
    const userDb = await this.userRepository.findOneBy({ id: id });

    if (!userDb) throw new NotFoundException('User not found');
    try {
      const guilds = await axios.get(
        `https://discord.com/api/users/@me/guilds`,
        {
          headers: {
            Authorization: `Bearer ${userDb.access_token}`,
          },
        },
      );
      const guildsInCommon = guilds.data.filter((guild) => {
        return this.client.guilds.cache.has(guild.id);
      });
      return guildsInCommon;
    } catch (err) {
      if (err.response.status === 401) {
        await this.getRefreshToken(userDb);
        return this.getCommonGuilds(id);
      }
      throw new HttpException(err.response.data, err.response.status);
    }
  }
}
