import { Effect } from 'effect';
import { getBlogsByTypeUseCase } from '../../application/use-cases/get-blogs-by-type.use-case';
import { BlogsNotFoundError } from '../../entities/errors/blogs-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Blog, BlogDto } from '../../entities/models/blog';

function presenter(blogs: Array<Blog>) {
  return [
    ...blogs
  ];
}

export function getBlogsByTypeController(type: BlogDto['type']): Effect.Effect<
  ReturnType<typeof presenter>,
  BlogsNotFoundError | ZodParseError
> {
  return Effect.map(getBlogsByTypeUseCase(type), (blogs) => presenter(blogs));
}
