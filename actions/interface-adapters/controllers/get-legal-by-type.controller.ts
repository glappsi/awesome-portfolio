import { Effect } from 'effect';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Legal, LegalDto } from '../../entities/models/legal';
import { LegalNotFoundError } from '../../entities/errors/legal-not-found.error';
import { getLegalByTypeUseCase } from '../../application/use-cases/get-legal-by-type.use-case';

function presenter(legal: Legal) {
  return {
    ...legal,
  };
}

export function getLegalByTypeController(
  type: LegalDto['type'],
): Effect.Effect<
  ReturnType<typeof presenter>,
  LegalNotFoundError | ZodParseError
> {
  return Effect.map(getLegalByTypeUseCase(type), (legal) => presenter(legal));
}
