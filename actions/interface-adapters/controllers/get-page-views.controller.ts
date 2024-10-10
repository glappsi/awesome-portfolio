import { Effect } from 'effect';
import { getPageViewsUseCase } from '../../application/use-cases/get-page-views.use-case';
import { Blog, BlogViews } from '../../entities/models/blog';

function presenter(views: BlogViews) {
  return {
    ...views
  }
}

export function getPageViewsController(blogs: Array<Blog>): Effect.Effect<
  ReturnType<typeof presenter>
> {
  return Effect.map(getPageViewsUseCase(blogs), (views) => presenter(views));
}
