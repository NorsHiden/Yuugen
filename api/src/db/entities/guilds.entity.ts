import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Music } from './music.entity';
import { Settings } from './settings.entity';

@Entity()
export class Guild {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Music, (music) => music.id)
  music: Music;

  @OneToOne(() => Settings, (settings) => settings.id)
  settings: Settings;
}
