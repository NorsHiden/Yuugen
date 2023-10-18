import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import IUsersService from '../interfaces/users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async find(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async create(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }

  async update(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneBy(options: any): Promise<User> {
    return this.userRepository.findOneBy(options);
  }

  async getDataFromDiscord(
    apiURL: string,
    access_token: string,
    refresh_token: string,
  ): Promise<any> {
    try {
      // Send a GET request to obtain user data using the access token
      const response = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // If successful, return the user data
      return response.data;
    } catch (error) {
      // If the access token is expired, use the refresh token to obtain a new access token
      try {
        const refreshResponse = await axios.post(
          'https://discord.com/api/v10/oauth2/token',
          null,
          {
            params: {
              client_id: this.configService.get('DISCORD_CLIENT_ID'),
              client_secret: this.configService.get('DISCORD_CLIENT_SECRET'),
              grant_type: 'refresh_token',
              refresh_token: refresh_token,
            },
          },
        );
        const res = await this.getDataFromDiscord(
          apiURL,
          refreshResponse.data.access_token,
          refreshResponse.data.refresh_token,
        );
        this.update({
          id: res.id,
          access_token: refreshResponse.data.access_token,
          refresh_token: refreshResponse.data.refresh_token,
        } as User);
        return res;
      } catch (refreshError) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
  }

  async getUser(id: string): Promise<DiscordUser> {
    const user = await this.find(id);
    if (!user) return {} as DiscordUser;
    const discordUser = await this.getDataFromDiscord(
      'https://discord.com/api/v10/users/@me',
      user.access_token,
      user.refresh_token,
    );
    return {
      id: discordUser.id,
      username: discordUser.username,
      global_name: discordUser.global_name,
      avatar: discordUser.avatar,
    } as DiscordUser;
  }
}
