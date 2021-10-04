import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Article, ArticleRelations, Author} from '../models';
import {AuthorRepository} from './author.repository';

export class ArticleRepository extends DefaultCrudRepository<
  Article,
  typeof Article.prototype.id,
  ArticleRelations
> {

  public readonly Author: BelongsToAccessor<Author, typeof Article.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AuthorRepository') protected authorRepositoryGetter: Getter<AuthorRepository>,
  ) {
    super(Article, dataSource);
    this.Author = this.createBelongsToAccessorFor('Author', authorRepositoryGetter,);
    this.registerInclusionResolver('Author', this.Author.inclusionResolver);
  }
}
