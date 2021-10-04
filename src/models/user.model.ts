import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {UserGroup} from './user-group.model';
import {UserRole} from './user-role.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => UserGroup)
  user_group_id: number;

  @hasMany(() => UserRole, {keyTo: 'user_id'})
  user_role_list: UserRole[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
