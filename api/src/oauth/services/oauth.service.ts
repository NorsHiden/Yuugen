import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class OAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  generateJwt(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async findUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async registerUser(user: User): Promise<string> {
    const newUser = await this.userRepository.save(user);
    return this.generateJwt(newUser);
  }

  async signIn(user: User): Promise<string> {
    if (!user) throw new BadRequestException('Unauthenticated');

    const userExists = await this.findUser(user.id);

    if (!userExists) return this.registerUser(user);

    return this.generateJwt(userExists);
  }
}
