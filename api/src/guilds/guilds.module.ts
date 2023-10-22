import { Module } from '@nestjs/common';
import { GuildsController } from './controllers/guilds.controller';
import Services from 'src/utils/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guild } from 'src/db/entities/guilds.entity';
import { User } from 'src/db/entities/users.entity';
import { Settings } from 'src/db/entities/settings.entity';
import { Music } from 'src/db/entities/music.entity';
import { Song } from 'src/db/entities/song.entity';
import { GuildsService } from './services/guilds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guild, Music, Song, User, Settings])],
  controllers: [GuildsController],
  providers: [{ provide: Services.GUILDS, useClass: GuildsService }],
})
export class GuildsModule {}
