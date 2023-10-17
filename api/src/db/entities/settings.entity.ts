import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  prefix: string;

  @Column()
  music_mod: boolean;

  @Column()
  guild_mod: boolean;

  @Column()
  txt2txt_mod: boolean;

  @Column()
  txt2img_mod: boolean;
}
