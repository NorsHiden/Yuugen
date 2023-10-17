import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
