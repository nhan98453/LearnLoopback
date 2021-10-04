import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserGroup} from './user-group.model';

@model()
export class Department extends Entity {
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

  @hasMany(() => UserGroup, {keyTo: 'department_id'})
  user_group_list: UserGroup[];

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
