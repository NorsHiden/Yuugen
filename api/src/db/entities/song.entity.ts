import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

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
  duration: string;

  @OneToOne(() => User, (user) => user.id)
  requester_id: User;

  @Column()
  timestamp_added: Date;
}
