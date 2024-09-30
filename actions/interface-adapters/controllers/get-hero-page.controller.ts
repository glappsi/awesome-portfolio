import { Effect } from "effect";
import { Page } from '../../entities/models/page';
import { getHeroPageUseCase } from '../../application/use-cases/get-hero-page.use-case';
import { HeroPageNotFoundError } from '../../entities/errors/hero-page-not-found.error';

function presenter(page: Page) {
  return {
    ...page
  }
}

export function getHeroPageController(): Effect.Effect<ReturnType<typeof presenter>, HeroPageNotFoundError> {
  return Effect.map(
    getHeroPageUseCase(), 
    (page) => presenter(page)
  );
}