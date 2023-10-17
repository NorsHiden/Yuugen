import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './song.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Song, (song) => song.id)
  songs: Song[];
}
