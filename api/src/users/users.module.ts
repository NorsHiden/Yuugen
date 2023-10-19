import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import Services from 'src/utils/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/users.entity';
import { UsersGuard } from './guards/users.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    UsersGuard,
  ],
})
export class UsersModule {}
