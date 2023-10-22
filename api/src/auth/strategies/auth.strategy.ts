import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, CallbackFunction } from 'passport-discord';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/db/entities/users.entity';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly configService: ConfigService) {
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
    if (!profile || !profile.id)
      return done(
        new ForbiddenException("Invalid 'code' in request", 'Invalid code'),
        false,
      );
    const user = {
      id: profile.id,
      access_token: accessToken,
      refresh_token: refreshToken,
      created_at: new Date(),
    } as User;
    done(null, user);
  }
}
