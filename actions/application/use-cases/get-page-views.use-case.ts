import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { Blog, BlogViews } from '../../entities/models/blog';

export function getPageViewsUseCase(blogs: Array<Blog>): Effect.Effect<
  BlogViews
> {
  const repository = getInjection('IPageViewRepository');

  return Effect.promise(async () => {
    return await repository.getViews(blogs);
  }).pipe(
    Effect.catchAll((error) => {
      console.error(error);
      return Effect.succeed({} as BlogViews);
    })
  );
}