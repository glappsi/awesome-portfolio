import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { BlogNotFoundError } from '../../entities/errors/blog-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { blogDetailSchema, BlogWithDetails } from '../../entities/models/blog';

export function getBlogBySlugUseCase(
  slug: string,
): Effect.Effect<BlogWithDetails, BlogNotFoundError | ZodParseError> {
  const repository = getInjection('IBlogsRepository');

  const program = Effect.tryPromise({
    async try() {
      const blog = await repository.getBlogBySlug(slug);
      if (!blog) {
        throw new BlogNotFoundError();
      }

      return blog;
    },
    catch(error: unknown) {
      return new BlogNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseBlogEffect = (blog: unknown) =>
    Effect.try({
      try() {
        return blogDetailSchema.parse(blog);
      },
      catch(_error: unknown) {
        return new ZodParseError('BlogWithDetails', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: blog,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseBlogEffect));
}
