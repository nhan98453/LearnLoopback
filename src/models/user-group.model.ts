import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department} from './department.model';

@model()
export class UserGroup extends Entity {
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
  name: string;

  @belongsTo(() => Department, {name: 'department'})
  department_id: number;

  constructor(data?: Partial<UserGroup>) {
    super(data);
  }
}

export interface UserGroupRelations {
  // describe navigational properties here
}

export type UserGroupWithRelations = UserGroup & UserGroupRelations;
