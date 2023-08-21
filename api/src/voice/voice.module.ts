import { Module } from '@nestjs/common';
import { VoiceController } from './controllers/voice.controller';
import { VoiceService } from './services/voice.service';
import { GuildConnectionService } from './services/guild-connection.service';
import { PlayerService } from './services/player.service';
import { UserService } from 'src/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [VoiceController],
  providers: [VoiceService, UserService, GuildConnectionService, PlayerService],
})
export class VoiceModule {}
