import { Effect } from 'effect';
import { getBlogsUseCase } from '../../application/use-cases/get-blogs.use-case';
import { BlogsNotFoundError } from '../../entities/errors/blogs-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Blog } from '../../entities/models/blog';

function presenter(blogs: Array<Blog>) {
  return [
    ...blogs
  ];
}

export function getBlogsController(): Effect.Effect<
  ReturnType<typeof presenter>,
  BlogsNotFoundError | ZodParseError
> {
  return Effect.map(getBlogsUseCase(), (blogs) => presenter(blogs));
}
