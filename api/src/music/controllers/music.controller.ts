import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import Routes from 'src/utils/routes';
import Services from 'src/utils/services';
import { IMusicService } from '../interfaces/music.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { interval, map } from 'rxjs';

@Controller(Routes.MUSIC)
@UseGuards(JwtAuthGuard)
export class MusicController {
  constructor(
    @Inject(Services.MUSIC) private readonly musicService: IMusicService,
  ) {}

  @Post('join')
  async join(
    @Query('guild_id') guild_id: string,
    @Query('channel_id') channelId: string,
  ) {
    return await this.musicService.join(guild_id, channelId);
  }

  @Post('leave')
  async leave(@Query('guild_id') guild_id: string) {
    return await this.musicService.leave(guild_id);
  }

  @Post('play')
  async play(
    @Query('guild_id') guild_id: string,
    @Query('index') index: number,
    @Query('seek') seek?: number,
  ) {
    return await this.musicService.play(guild_id, index, seek);
  }

  @Post('pause')
  async pause(@Query('guild_id') guild_id: string) {
    return await this.musicService.pause(guild_id);
  }

  @Post('resume')
  async resume(@Query('guild_id') guild_id: string) {
    return await this.musicService.resume(guild_id);
  }

  @Post('stop')
  async stop(@Query('guild_id') guild_id: string) {
    return await this.musicService.stop(guild_id);
  }

  @Post('volume')
  async volume(
    @Query('guild_id') guild_id: string,
    @Query('volume') volume: number,
  ) {
    return await this.musicService.volume(guild_id, volume);
  }

  @Post('shuffle')
  async shuffle(@Query('guild_id') guild_id: string) {
    return await this.musicService.shuffle(guild_id);
  }

  @Post('loop')
  async loop(@Query('guild_id') guild_id: string) {
    return await this.musicService.loop(guild_id);
  }

  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('options') options: string,
  ) {
    return await this.musicService.search(query, options);
  }

  @Post('song')
  async addSong(
    @Query('user_id') user_id: string,
    @Query('guild_id') guild_id: string,
    @Query('url') url: string,
    @Query('platform') platform: string,
    @Query('type') type: string,
  ) {
    return await this.musicService.addSong(
      user_id,
      guild_id,
      url,
      platform,
      type,
    );
  }

  @Delete('song')
  async remove(
    @Query('guild_id') guild_id: string,
    @Query('song') song: number,
  ) {
    return await this.musicService.removeSong(guild_id, song);
  }

  @Post('clear')
  async clear(@Query('guild_id') guild_id: string) {
    return await this.musicService.clearQueue(guild_id);
  }

  @Get('queue')
  async queue(@Query('guild_id') guild_id: string) {
    return await this.musicService.getQueue(guild_id);
  }

  @Get('current')
  async current(@Query('guild_id') guild_id: string) {
    return await this.musicService.current(guild_id);
  }

  @Sse('updates')
  async updates(@Query('guild_id') guild_id: string) {
    return interval(1000).pipe(
      map(async (_) => {
        console.log('sse');
        return {
          data: await this.musicService.serverMusicUpdates(guild_id),
        };
      }),
    );
  }
}
