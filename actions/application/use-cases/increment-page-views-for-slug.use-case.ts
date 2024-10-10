import { getInjection } from '@/di/container';
import { Effect } from 'effect';

export function incrementPageViewsForSlugUseCase(slug: string, hash?: string): Effect.Effect<
  void
> {
  const repository = getInjection('IPageViewRepository');

  return Effect.promise(async () => {
    const isDuplicate = hash && await repository.isDuplicate(hash);
    if (isDuplicate) {
      return;
    }

    return await repository.incrementViews(slug);
  }).pipe(
    Effect.catchAll((error) => {
      console.error(error);
      return Effect.succeed(undefined);
    })
  );
}