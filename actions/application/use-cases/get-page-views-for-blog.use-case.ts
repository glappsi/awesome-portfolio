import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { Blog } from '../../entities/models/blog';

export function getPageViewsForBlogUseCase(blog: Blog): Effect.Effect<
  number
> {
  const repository = getInjection('IPageViewRepository');

  return Effect.promise(async () => {
    return await repository.getViewsForBlog(blog);
  }).pipe(
    Effect.catchAll((error) => {
      console.error(error);
      return Effect.succeed(0);
    })
  );
}