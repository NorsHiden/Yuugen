import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/db/entities/users.entity';
import IUsersService from 'src/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import Services from 'src/utils/services';
import { IAuthService } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  generateJwt(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async signIn(user: User): Promise<string> {
    if (!user) throw new BadRequestException('Unauthenticated');
    const userExists = await this.usersService.find(user.id);
    if (!userExists) this.usersService.create(user);
    return this.generateJwt(user);
  }
}
