import { Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Music } from './music.entity';
import { Settings } from './settings.entity';
import { User } from './users.entity';

@Entity()
export class Guild {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => User, (user) => user.id)
  admins: User[];

  @OneToMany(() => User, (user) => user.id)
  mods: User[];

  @OneToOne(() => Music, (music) => music.id)
  music: Music;

  @OneToOne(() => Settings, (settings) => settings.id)
  settings: Settings;
}
