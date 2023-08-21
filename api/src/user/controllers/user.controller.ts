import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@Req() req: any) {
    return this.userService.getMe(req.user.id);
  }

  @Get('guilds')
  async guilds(@Req() req: any) {
    return this.userService.getCommonGuilds(req.user.id);
  }
}
