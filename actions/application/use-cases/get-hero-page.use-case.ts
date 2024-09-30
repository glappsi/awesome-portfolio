import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { HeroPageNotFoundError } from '../../entities/errors/hero-page-not-found.error';
import { Page, pageSchema } from '../../entities/models/page';
import { ZodParseError } from '../../entities/errors/zod-parse.error';

export function getHeroPageUseCase(): Effect.Effect<Page, HeroPageNotFoundError | ZodParseError> {
  const repository = getInjection('IPagesRepository');

  const program = Effect.tryPromise({
    async try() {
      const page = await repository.getHero();
      if (!page) {
        throw new HeroPageNotFoundError();
      }

      return page;
    },
    catch(error: unknown) {
      return new HeroPageNotFoundError()
    }
  });

  const parseHeroPageEffect = (page: unknown) =>
    Effect.try({
      try() {
        return pageSchema.parse(page);
      },
      catch(_error: unknown) {
        return new ZodParseError('Page');
      },
    });

  return program.pipe(Effect.flatMap(parseHeroPageEffect));
}