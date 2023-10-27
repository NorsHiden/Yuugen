import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NecordModule } from 'necord';
import { IntentsBitField, User } from 'discord.js';
import { AppService } from './app.service';
import { GuildsModule } from './guilds/guilds.module';
import { MusicModule } from './music/music.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    NecordModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_CLIENT_TOKEN'),
        intents: [
          IntentsBitField.Flags.Guilds,
          IntentsBitField.Flags.GuildMembers,
          IntentsBitField.Flags.GuildMessages,
          IntentsBitField.Flags.GuildVoiceStates,
        ],
      }),
    }),
    DatabaseModule,
    AuthModule,
    MusicModule,
    UsersModule,
    GuildsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
