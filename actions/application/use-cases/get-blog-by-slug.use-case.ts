import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { BlogNotFoundError } from '../../entities/errors/blog-not-found.error';
import { blogDetailSchema, BlogWithDetails } from '../../entities/models/blog';

export function getBlogBySlugUseCase(slug: string): Effect.Effect<BlogWithDetails, BlogNotFoundError | ZodParseError> {
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
      return new BlogNotFoundError()
    }
  });

  const parseBlogEffect = (blog: unknown) =>
    Effect.try({
      try() {
        return blogDetailSchema.parse(blog);
      },
      catch(_error: unknown) {
        return new ZodParseError('BlogWithDetails');
      },
    });

  return program.pipe(Effect.flatMap(parseBlogEffect));
}