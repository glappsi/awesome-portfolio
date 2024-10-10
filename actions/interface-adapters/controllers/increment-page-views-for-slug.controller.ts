import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { incrementPageViewsForSlugUseCase } from '../../application/use-cases/increment-page-views-for-slug.use-case';

export function incrementPageViewsForSlugController(slug: string, ip?: string): Effect.Effect<
  void
> {
  const service = getInjection('IPageViewService');

  return Effect.promise(async () => {
    return await service.hashIp(ip);
  }).pipe(
    Effect.catchAll((error) => {
      console.error(error);
      return Effect.succeed(undefined);
    })
  ).pipe(
    Effect.flatMap(
      (hash?: string) => Effect.map(incrementPageViewsForSlugUseCase(slug, hash), () => undefined)
    )
  );
}
