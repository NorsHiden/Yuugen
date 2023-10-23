import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Guild } from './guilds.entity';
import { Song } from './song.entity';

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

  @ManyToOne(() => Guild, (guild) => guild.admins)
  admin_guilds: Guild[];

  @ManyToOne(() => Guild, (guild) => guild.mods)
  mod_guilds: Guild[];

  @OneToOne(() => Song, (song) => song.requester)
  requestedSong: Song;
}
