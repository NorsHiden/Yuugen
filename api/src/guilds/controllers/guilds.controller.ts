import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
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
}
