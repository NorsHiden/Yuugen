import { Guild } from 'src/db/entities/guilds.entity';
import { User } from 'src/db/entities/users.entity';

export interface IGuildsService {
  onApplicationBootstrap(): Promise<void>;
  find(id: string): Promise<Guild>;
  create(guild: Guild): Promise<Guild>;
  update(guild: Guild): Promise<Guild>;
  delete(id: string): Promise<void>;
  addAdmin(id: string, user: User): Promise<Guild>;
  addMod(id: string, user: User): Promise<Guild>;
  removeAdmin(id: string, user: User): Promise<Guild>;
  removeMod(id: string, user: User): Promise<Guild>;
  // setPrefix(id: string, prefix: string): Promise<Guild>;
  // setDJRole(id: string, role: Role): Promise<Guild>;
  // setModRole(id: string, role: Role): Promise<Guild>;
  // setAdminRole(id: string, role: Role): Promise<Guild>;
  // setMusicChannel(id: string, channel: Channel): Promise<Guild>;
  // setWelcomeChannel(id: string, channel: Channel): Promise<Guild>;
  // setWelcomeMessage(id: string, message: string): Promise<Guild>;
  // setLeaveChannel(id: string, channel: Channel): Promise<Guild>;
  // setLeaveMessage(id: string, message: string): Promise<Guild>;
  // setAutoRole(id: string, role: Role): Promise<Guild>;
  // setAutoRoleEnabled(id: string, enabled: boolean): Promise<Guild>;
  // setAutoRoleDelay(id: string, delay: number): Promise<Guild>;
  // setAutoRoleMessage(id: string, message: string): Promise<Guild>;
  // setAutoRoleChannel(id: string, channel: Channel): Promise<Guild>;
  // setAutoRoleRemove(id: string, remove: boolean): Promise<Guild>;
  // setAutoRoleRemoveDelay(id: string, delay: number): Promise<Guild>;
  // setAutoRoleRemoveMessage(id: string, message: string): Promise<Guild>;
  // setAutoRoleRemoveChannel(id: string, channel: Channel): Promise<Guild>;
  // setAutoRoleRemoveEnabled(id: string, enabled: boolean): Promise<Guild>;
  // setAutoRoleRemoveRole(id: string, role: Role): Promise<Guild>;
}
