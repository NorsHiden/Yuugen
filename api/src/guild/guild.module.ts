import { Module } from '@nestjs/common';
import { GuildController } from './controllers/guild.controller';
import { GuildService } from './services/guild.service';

@Module({
  controllers: [GuildController],
  providers: [GuildService],
})
export class GuildModule {}
