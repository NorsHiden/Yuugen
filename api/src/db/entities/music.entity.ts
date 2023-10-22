import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './song.entity';
import { Guild } from './guilds.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Song, (song) => song.music, { cascade: true })
  songs: Song[];

  @OneToOne(() => Guild, (guild) => guild.music)
  guild: Guild;
}
