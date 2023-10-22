import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Music } from './music.entity';
import { Settings } from './settings.entity';
import { User } from './users.entity';

@Entity()
export class Guild {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => User, (user) => user.admin_guilds, { cascade: true })
  admins: User[];

  @OneToMany(() => User, (user) => user.mod_guilds, { cascade: true })
  mods: User[];

  @OneToOne(() => Music, (music) => music.guild, { cascade: true })
  @JoinColumn()
  music: Music;

  @OneToOne(() => Settings, (settings) => settings.guild, {
    cascade: true,
  })
  @JoinColumn()
  settings: Settings;
}
