import { User } from 'src/db/entities/users.entity';

interface IUsersService {
  find(id: string): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findOneBy(options: any): Promise<User>;
}

export default IUsersService;
