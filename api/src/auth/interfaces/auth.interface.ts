import { User } from 'src/db/entities/users.entity';

export interface IAuthService {
  generateJwt(user: User): string;
  signIn(user: User): Promise<string>;
}
