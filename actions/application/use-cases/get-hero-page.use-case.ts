import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { HeroPageNotFoundError } from '../../entities/errors/hero-page-not-found.error';
import { Page } from '../../entities/models/page';

export function getHeroPageUseCase(): Effect.Effect<Page, HeroPageNotFoundError> {
  const repository = getInjection('IPagesRepository');

  return Effect.tryPromise({
    async try() {
      const page = await repository.getHero();
      if (!page) {
        throw new HeroPageNotFoundError();
      }
      return page;
    },
    catch: (error: unknown) => new HeroPageNotFoundError() // Handle error conversion
  });
}