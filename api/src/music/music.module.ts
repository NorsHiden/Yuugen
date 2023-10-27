import { Module } from '@nestjs/common';
import { MusicController } from './controllers/music.controller';
import Services from 'src/utils/services';
import { MusicService } from './services/music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/db/entities/music.entity';
import { Guild } from 'src/db/entities/guilds.entity';
import { User } from 'src/db/entities/users.entity';
import { GuildsModule } from 'src/guilds/guilds.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guild, Music, User]),
    GuildsModule,
    UsersModule,
  ],
  controllers: [MusicController],
  providers: [
    {
      provide: Services.MUSIC,
      useClass: MusicService,
    },
  ],
  exports: [],
})
export class MusicModule {}
