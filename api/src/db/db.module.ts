import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/users.entity';
import { typeOrmConfig } from './typeorm.config';
import { ConfigService } from '@nestjs/config';
import { Guild } from './entities/guilds.entity';
import { Music } from './entities/music.entity';
import { Song } from './entities/song.entity';
import { Settings } from './entities/settings.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User, Guild, Music, Song, Settings]),
  ],
})
export class DatabaseModule {}
