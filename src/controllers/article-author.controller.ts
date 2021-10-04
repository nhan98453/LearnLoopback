import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Article,
  Author,
} from '../models';
import {ArticleRepository} from '../repositories';

export class ArticleAuthorController {
  constructor(
    @repository(ArticleRepository)
    public articleRepository: ArticleRepository,
  ) { }

  @get('/articles/{id}/author', {
    responses: {
      '200': {
        description: 'Author belonging to Article',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Author)},
          },
        },
      },
    },
  })
  async getAuthor(
    @param.path.number('id') id: typeof Article.prototype.id,
  ): Promise<Author> {
    return this.articleRepository.Author(id);
  }
}
