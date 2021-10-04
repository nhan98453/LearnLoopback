import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, UserGroup, UserRole} from '../models';
import {UserGroupRepository} from './user-group.repository';
import {UserRoleRepository} from './user-role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userGroup: BelongsToAccessor<UserGroup, typeof User.prototype.id>;

  public readonly user_role_list: HasManyRepositoryFactory<UserRole, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserGroupRepository') protected userGroupRepositoryGetter: Getter<UserGroupRepository>, @repository.getter('UserRoleRepository') protected userRoleRepositoryGetter: Getter<UserRoleRepository>,
  ) {
    super(User, dataSource);
    this.user_role_list = this.createHasManyRepositoryFactoryFor('user_role_list', userRoleRepositoryGetter,);
    this.registerInclusionResolver('user_role_list', this.user_role_list.inclusionResolver);
    this.userGroup = this.createBelongsToAccessorFor('userGroup', userGroupRepositoryGetter,);
    this.registerInclusionResolver('userGroup', this.userGroup.inclusionResolver);
  }
}
