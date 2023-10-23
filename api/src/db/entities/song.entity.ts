import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Music } from './music.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  url: string;

  @Column()
  thumbnail: string;

  @Column()
  duration: number;

  @OneToOne(() => User, (user) => user.requestedSong)
  @JoinColumn()
  requester: User;

  @Column()
  timestamp_added: Date;

  @ManyToOne(() => Music, (music) => music.songs, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  music: Music;
}
