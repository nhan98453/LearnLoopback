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
  Author,
  Article,
} from '../models';
import {AuthorRepository} from '../repositories';

export class AuthorArticleController {
  constructor(
    @repository(AuthorRepository) protected authorRepository: AuthorRepository,
  ) { }

  @get('/authors/{id}/articles', {
    responses: {
      '200': {
        description: 'Array of Author has many Article',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Article)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Article>,
  ): Promise<Article[]> {
    return this.authorRepository.articles(id).find(filter);
  }

  @post('/authors/{id}/articles', {
    responses: {
      '200': {
        description: 'Author model instance',
        content: {'application/json': {schema: getModelSchemaRef(Article)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Author.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {
            title: 'NewArticleInAuthor',
            exclude: ['id'],
            optional: ['author_id']
          }),
        },
      },
    }) article: Omit<Article, 'id'>,
  ): Promise<Article> {
    return this.authorRepository.articles(id).create(article);
  }

  @patch('/authors/{id}/articles', {
    responses: {
      '200': {
        description: 'Author.Article PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {partial: true}),
        },
      },
    })
    article: Partial<Article>,
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where<Article>,
  ): Promise<Count> {
    return this.authorRepository.articles(id).patch(article, where);
  }

  @del('/authors/{id}/articles', {
    responses: {
      '200': {
        description: 'Author.Article DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where<Article>,
  ): Promise<Count> {
    return this.authorRepository.articles(id).delete(where);
  }
}
