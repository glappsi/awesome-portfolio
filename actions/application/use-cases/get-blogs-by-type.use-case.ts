import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { BlogsNotFoundError } from '../../entities/errors/blogs-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Blog, BlogDto, blogListSchema } from '../../entities/models/blog';

export function getBlogsByTypeUseCase(type: BlogDto['type']): Effect.Effect<
  Array<Blog>,
  BlogsNotFoundError | ZodParseError
> {
  const repository = getInjection('IBlogsRepository');

  const program = Effect.tryPromise({
    async try() {
      const blogs = await repository.getBlogsByType(type);
      if (!blogs?.length) {
        throw new BlogsNotFoundError();
      }

      return blogs;
    },
    catch(error: unknown) {
      return new BlogsNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseBlogsEffect = (blogs: unknown) =>
    Effect.try({
      try() {
        return blogListSchema.parse(blogs);
      },
      catch(_error: unknown) {
        return new ZodParseError('Blogs', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: blogs,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseBlogsEffect));
}
