import { Effect } from 'effect';
import { getPageViewsForBlogUseCase } from '../../application/use-cases/get-page-views-for-blog.use-case';
import { Blog } from '../../entities/models/blog';

function presenter(views: number) {
  return views;
}

export function getPageViewsForBlogController(blog: Blog): Effect.Effect<
  ReturnType<typeof presenter>
> {
  return Effect.map(getPageViewsForBlogUseCase(blog), (views) => presenter(views));
}
