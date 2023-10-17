import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class DiscordAuthGuard extends AuthGuard('discord') {}
