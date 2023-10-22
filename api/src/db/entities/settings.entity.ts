import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guild } from './guilds.entity';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    default: '!',
  })
  prefix: string;

  @Column({
    default: false,
  })
  music_mod: boolean;

  @Column({
    default: false,
  })
  guild_mod: boolean;

  @Column({
    default: false,
  })
  txt2txt_mod: boolean;

  @Column({
    default: false,
  })
  txt2img_mod: boolean;

  @OneToOne(() => Guild, (guild) => guild.settings)
  guild: Guild;
}
