import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
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

  @ManyToOne(() => Guild, (guild) => guild.admins)
  admin_guilds: User;

  @ManyToOne(() => Guild, (guild) => guild.mods)
  mod_guilds: User;
}
