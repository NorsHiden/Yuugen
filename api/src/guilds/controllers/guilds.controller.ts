import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import Routes from 'src/utils/routes';
import Services from 'src/utils/services';
import { IGuildsService } from '../interfaces/guilds.interface';

@Controller(Routes.GUILDS)
@UseGuards(JwtAuthGuard)
export class GuildsController {
  constructor(
    @Inject(Services.GUILDS) private readonly guildsService: IGuildsService,
  ) {}

  @Get('common')
  async getCommonGuilds(@Req() req) {
    return await this.guildsService.getCommonGuilds(req.user.id);
  }

  @Get('voices')
  async getVoices(@Query('guild_id') guild_id: string) {
    return this.guildsService.getVoices(guild_id);
  }

  @Get('current-voice')
  async getCurrentVoice(@Query('guild_id') guild_id: string) {
    return this.guildsService.getCurrentVoice(guild_id);
  }
}
