import { Effect } from "effect";
import { LegalsNotFoundError } from '../../entities/errors/legals-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Legal } from '../../entities/models/legal';
import { getLegalsUseCase } from '../../application/use-cases/get-legals.use-case';

function presenter(legals: Array<Legal>) {
  return [
    ...legals
  ];
}

export function getLegalsController(): Effect.Effect<ReturnType<typeof presenter>, LegalsNotFoundError | ZodParseError> {
  return Effect.map(
    getLegalsUseCase(), 
    (legals) => presenter(legals)
  );
}