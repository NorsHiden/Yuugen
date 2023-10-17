import { Injectable } from '@nestjs/common';
import IUsersService from '../interfaces/users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async find(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }

  async update(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneBy(options: any): Promise<User> {
    return this.userRepository.findOneBy(options);
  }
}
