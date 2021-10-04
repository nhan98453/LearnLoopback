import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Article, Author, AuthorRelations} from '../models';
import {ArticleRepository} from './article.repository';

export class AuthorRepository extends DefaultCrudRepository<
  Author,
  typeof Author.prototype.id,
  AuthorRelations
> {

  public readonly id: HasManyRepositoryFactory<Article, typeof Author.prototype.id>;

  public readonly articles: HasManyRepositoryFactory<Article, typeof Author.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ArticleRepository') protected articleRepositoryGetter: Getter<ArticleRepository>,
  ) {
    super(Author, dataSource);
    this.articles = this.createHasManyRepositoryFactoryFor('articles', articleRepositoryGetter,);
    this.registerInclusionResolver('articles', this.articles.inclusionResolver);
  }
}
