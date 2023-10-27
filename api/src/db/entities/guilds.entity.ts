import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Music } from './music.entity';
import { User } from './users.entity';

@Entity()
export class Guild {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => User, (user) => user.mod_guilds, { cascade: true })
  mods: User[];

  @OneToMany(() => User, (user) => user.dj_guilds, { cascade: true })
  djs: User[];

  @OneToOne(() => Music, (music) => music.guild, { cascade: true })
  @JoinColumn()
  music: Music;
}
