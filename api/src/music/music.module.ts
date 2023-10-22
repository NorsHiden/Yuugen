import { Module } from '@nestjs/common';
import { MusicController } from './controllers/music.controller';
import Services from 'src/utils/services';
import { MusicService } from './services/music.service';
import { GuildsService } from 'src/guilds/services/guilds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/db/entities/music.entity';
import { Song } from 'src/db/entities/song.entity';
import { Settings } from 'src/db/entities/settings.entity';
import { Guild } from 'src/db/entities/guilds.entity';
import { User } from 'src/db/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guild, Music, Song, User, Settings])],
  controllers: [MusicController],
  providers: [
    {
      provide: Services.GUILDS,
      useClass: GuildsService,
    },
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    {
      provide: Services.MUSIC,
      useClass: MusicService,
    },
  ],
  exports: [],
})
export class MusicModule {}
