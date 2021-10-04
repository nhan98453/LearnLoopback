import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  UserGroup,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserGroupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-group', {
    responses: {
      '200': {
        description: 'UserGroup belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserGroup)},
          },
        },
      },
    },
  })
  async getUserGroup(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<UserGroup> {
    return this.userRepository.userGroup(id);
  }
}
