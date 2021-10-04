import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserGroup,
  Department,
} from '../models';
import {UserGroupRepository} from '../repositories';

export class UserGroupDepartmentController {
  constructor(
    @repository(UserGroupRepository)
    public userGroupRepository: UserGroupRepository,
  ) { }

  @get('/user-groups/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to UserGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department)},
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.number('id') id: typeof UserGroup.prototype.id,
  ): Promise<Department> {
    return this.userGroupRepository.department_list(id);
  }
}
