import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Department, DepartmentRelations, UserGroup} from '../models';
import {UserGroupRepository} from './user-group.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly user_group_list: HasManyRepositoryFactory<UserGroup, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserGroupRepository') protected userGroupRepositoryGetter: Getter<UserGroupRepository>,
  ) {
    super(Department, dataSource);
    this.user_group_list = this.createHasManyRepositoryFactoryFor('user_group_list', userGroupRepositoryGetter,);
    this.registerInclusionResolver('user_group_list', this.user_group_list.inclusionResolver);
  }
}
