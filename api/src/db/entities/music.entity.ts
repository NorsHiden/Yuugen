import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guild } from './guilds.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Guild, (guild) => guild.music, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  guild: Guild;
}
