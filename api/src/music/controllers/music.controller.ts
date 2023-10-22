import { Controller, Get, Inject, Post, Query } from '@nestjs/common';
import Routes from 'src/utils/routes';
import Services from 'src/utils/services';
import { IMusicService } from '../interfaces/music.interface';

@Controller(Routes.MUSIC)
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
  async play(@Query('guild_id') guild_id: string, @Query('song') song: string) {
    return await this.musicService.play(guild_id, song);
  }

  @Post('seek')
  async seek(
    @Query('guild_id') guild_id: string,
    @Query('position') position: number,
  ) {
    return await this.musicService.seek(guild_id, position);
  }

  @Post('pause')
  async pause(@Query('guild_id') guild_id: string) {
    return await this.musicService.pause(guild_id);
  }

  @Post('resume')
  async resume(@Query('guild_id') guild_id: string) {
    return await this.musicService.resume(guild_id);
  }

  @Post('previous')
  async previous(@Query('guild_id') guild_id: string) {
    return await this.musicService.previous(guild_id);
  }

  @Post('skip')
  async skip(@Query('guild_id') guild_id: string) {
    return await this.musicService.skip(guild_id);
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

  @Post('remove')
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
}
