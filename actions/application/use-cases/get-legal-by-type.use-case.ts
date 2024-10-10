import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { LegalNotFoundError } from '../../entities/errors/legal-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Legal, LegalDto, legalSchema } from '../../entities/models/legal';

export function getLegalByTypeUseCase(
  type: LegalDto['type'],
): Effect.Effect<Legal, LegalNotFoundError | ZodParseError> {
  const repository = getInjection('ILegalsRepository');

  const program = Effect.tryPromise({
    async try() {
      const legal = await repository.getLegalByType(type);
      if (!legal) {
        throw new LegalNotFoundError(type);
      }

      return legal;
    },
    catch(error: unknown) {
      return new LegalNotFoundError(type, {
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseLegalEffect = (legal: unknown) =>
    Effect.try({
      try() {
        return legalSchema.parse(legal);
      },
      catch(_error: unknown) {
        return new ZodParseError('Legals', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: legal,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseLegalEffect));
}
