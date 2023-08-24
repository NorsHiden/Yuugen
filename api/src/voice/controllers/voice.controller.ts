import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';
import { VoiceService } from '../services/voice.service';
import { PlayerService } from '../services/player.service';
import { Observable, interval, map } from 'rxjs';
import { MessageEvent } from 'src/interfaces';

@Controller('voice')
@UseGuards(JwtAuthGuard)
export class VoiceController {
  constructor(
    private readonly voiceService: VoiceService,
    private readonly playerService: PlayerService,
  ) {}

  @Post('join')
  async join(
    @Query('guildId') guildId: string,
    @Query('channelId') channelId: string,
  ) {
    return this.voiceService.join(guildId, channelId);
  }

  @Post('leave')
  async leave(@Query('guildId') guildId: string) {
    return this.voiceService.leave(guildId);
  }

  @Get('yt-search')
  async searchYoutube(@Query('prompt') prompt: string) {
    if (!prompt) throw new NotFoundException('Prompt not found');
    return await this.voiceService.searchYoutube(prompt);
  }

  @Post('queue')
  async addSong(
    @Req() req: any,
    @Query('guildId') guildId: string,
    @Query('url') url: string,
  ) {
    return this.voiceService.addSong(req.user.id, guildId, url);
  }

  @Delete('queue')
  async removeSong(
    @Query('guildId') guildId: string,
    @Query('index') index: number,
  ) {
    return this.voiceService.removeSong(guildId, index);
  }

  @Post('play-index')
  async playIndex(
    @Query('guildId') guildId: string,
    @Query('index') index: string,
  ) {
    return this.playerService.playIndex(guildId, +index);
  }

  @Post('play')
  async play(@Query('guildId') guildId: string) {
    return this.playerService.play(guildId);
  }

  @Post('pause')
  async pause(@Query('guildId') guildId: string) {
    return this.playerService.pause(guildId);
  }

  @Post('skip')
  async skip(@Query('guildId') guildId: string) {
    return this.playerService.skip(guildId);
  }

  @Post('previous')
  async previous(@Query('guildId') guildId: string) {
    return this.playerService.previous(guildId);
  }

  @Post('stop')
  async stop(@Query('guildId') guildId: string) {
    return this.playerService.stop(guildId);
  }

  @Post('loop')
  async loop(@Query('guildId') guildId: string) {
    return this.playerService.loop(guildId);
  }

  @Post('shuffle')
  async shuffle(@Query('guildId') guildId: string) {
    return this.playerService.shuffle(guildId);
  }

  @Sse('updates')
  updates(@Query('guildId') guildId: string): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({
        data: this.voiceService.getUpdates(guildId),
      })),
    );
  }
}
