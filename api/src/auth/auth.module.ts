import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import Services from 'src/utils/services';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/users.entity';
import DiscordAuthGuard from './guards/auth.guard';
import { DiscordStrategy } from './strategies/auth.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    DiscordAuthGuard,
    DiscordStrategy,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
