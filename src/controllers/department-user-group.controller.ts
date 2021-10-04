import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Department,
  UserGroup,
} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentUserGroupController {
  constructor(
    @repository(DepartmentRepository) protected departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/user-groups', {
    responses: {
      '200': {
        description: 'Array of Department has many UserGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserGroup)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserGroup>,
  ): Promise<UserGroup[]> {
    return this.departmentRepository.user_group_list(id).find(filter);
  }

  @post('/departments/{id}/user-groups', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserGroup)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Department.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserGroup, {
            title: 'NewUserGroupInDepartment',
            exclude: ['id'],
            optional: ['department_id']
          }),
        },
      },
    }) userGroup: Omit<UserGroup, 'id'>,
  ): Promise<UserGroup> {
    return this.departmentRepository.user_group_list(id).create(userGroup);
  }

  @patch('/departments/{id}/user-groups', {
    responses: {
      '200': {
        description: 'Department.UserGroup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserGroup, {partial: true}),
        },
      },
    })
    userGroup: Partial<UserGroup>,
    @param.query.object('where', getWhereSchemaFor(UserGroup)) where?: Where<UserGroup>,
  ): Promise<Count> {
    return this.departmentRepository.user_group_list(id).patch(userGroup, where);
  }

  @del('/departments/{id}/user-groups', {
    responses: {
      '200': {
        description: 'Department.UserGroup DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserGroup)) where?: Where<UserGroup>,
  ): Promise<Count> {
    return this.departmentRepository.user_group_list(id).delete(where);
  }
}
