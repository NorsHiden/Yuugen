import { Controller, Inject } from '@nestjs/common';
import Routes from 'src/utils/routes';
import IUsersService from '../interfaces/users.interface';
import Services from 'src/utils/services';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {}
}
