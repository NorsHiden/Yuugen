import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import UserRole from '../utils/user-role.enum';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) // private readonly guildsService: GuildsService,
  {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const requiredRole = UserRole.ADMINISTRATOR;
    // const user = context.switchToHttp().getRequest().user;
    // if (!user) return false;
    // const userRole = user.role;
    // return userRole === requiredRole;
    return true;
  }
}
