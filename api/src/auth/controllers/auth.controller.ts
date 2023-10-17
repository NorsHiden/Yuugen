import { Controller, Inject } from '@nestjs/common';
import Routes from 'src/utils/routes';
import Services from 'src/utils/services';
import { IAuthService } from '../interfaces/auth.interface';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH)
    private readonly authService: IAuthService,
  ) {}
}
