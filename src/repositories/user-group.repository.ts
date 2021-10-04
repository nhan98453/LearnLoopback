import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserGroup, UserGroupRelations, Department} from '../models';
import {DepartmentRepository} from './department.repository';

export class UserGroupRepository extends DefaultCrudRepository<
  UserGroup,
  typeof UserGroup.prototype.id,
  UserGroupRelations
> {

  public readonly department_list: BelongsToAccessor<Department, typeof UserGroup.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(UserGroup, dataSource);
    this.department_list = this.createBelongsToAccessorFor('department_list', departmentRepositoryGetter,);
    this.registerInclusionResolver('department_list', this.department_list.inclusionResolver);
  }
}
