import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, CallbackFunction } from 'passport-discord';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'guilds'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: CallbackFunction,
  ) {
    const user = {
      id: profile.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    done(null, user);
  }
}
