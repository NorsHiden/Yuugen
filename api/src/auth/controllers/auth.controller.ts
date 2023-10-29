import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import Routes from 'src/utils/routes';
import Services from 'src/utils/services';
import { IAuthService } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import DiscordAuthGuard from '../guards/auth.guard';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH)
    private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(DiscordAuthGuard)
  authLogin() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  async authRedirect(@Req() req, @Res() res) {
    const access_token = await this.authService.signIn(req.user);
    res.cookie('access_token', access_token, {
      MaxAge: 86400 * 7, // 1 day * 7
      sameSite: true,
      // secure: true,
      HttpOnly: true,
    });
    res.redirect(this.configService.get('CLIENT_URL'));
  }

  @Get('logout')
  async authLogout(@Res() res) {
    res.clearCookie('access_token');
    res.redirect(this.configService.get('CLIENT_URL'));
  }
}
