import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Guild } from './guilds.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Guild, (guild) => guild.djs)
  dj_guilds: Guild[];

  @ManyToOne(() => Guild, (guild) => guild.mods)
  mod_guilds: Guild[];
}
