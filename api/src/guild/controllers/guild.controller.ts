import { Controller, Get, Query, Sse, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';
import { GuildService } from '../services/guild.service';

@Controller('guild')
@UseGuards(JwtAuthGuard)
export class GuildController {
  constructor(private readonly guildService: GuildService) {}
  @Get('voices')
  async voices(@Query('guildId') guildId: string) {
    return this.guildService.getVoices(guildId);
  }

  @Get('current-voice')
  async currentVoice(@Query('guildId') guildId: string) {
    return this.guildService.getCurrentVoice(guildId);
  }
}
