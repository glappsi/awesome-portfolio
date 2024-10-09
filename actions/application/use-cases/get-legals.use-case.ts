import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { LegalsNotFoundError } from '../../entities/errors/legals-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Legal, legalListSchema } from '../../entities/models/legal';

export function getLegalsUseCase(): Effect.Effect<
  Array<Legal>,
  LegalsNotFoundError | ZodParseError
> {
  const repository = getInjection('ILegalsRepository');

  const program = Effect.tryPromise({
    async try() {
      const legals = await repository.getLegals();
      const hasAllLegals = legals?.length && ['privacy', 'imprint'].every(type => legals.find(l => l.type === type));
      if (!hasAllLegals) {
        throw new LegalsNotFoundError();
      }

      return legals;
    },
    catch(error: unknown) {
      return new LegalsNotFoundError({
        originalError: error,
      });
    },
  });

  const parseLegalsEffect = (legals: unknown) =>
    Effect.try({
      try() {
        return legalListSchema.parse(legals);
      },
      catch(_error: unknown) {
        return new ZodParseError('Legals', {
          originalError: _error,
          data: legals,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseLegalsEffect));
}
