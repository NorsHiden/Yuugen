import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
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
  async getVoices(@Req() req) {
    return await this.guildsService.getVoices(req.user.id);
  }

  @Get('current-voice')
  async getCurrentVoice(@Req() req) {
    return await this.guildsService.getCurrentVoice(req.user.id);
  }
}
