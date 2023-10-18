import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import Routes from 'src/utils/routes';
import IUsersService from '../interfaces/users.interface';
import Services from 'src/utils/services';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UsersGuard } from '../guards/users.guard';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {}

  @Get('me')
  async getMe(@Req() req) {
    return await this.usersService.getUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(UsersGuard)
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
}
