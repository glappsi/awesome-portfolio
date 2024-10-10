import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { CareerStepsNotFoundError } from '../../entities/errors/career-steps-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import {
  CareerStep,
  careerStepListSchema,
} from '../../entities/models/career-step';

export function getCareerStepsUseCase(): Effect.Effect<
  Array<CareerStep>,
  CareerStepsNotFoundError | ZodParseError
> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const careerSteps = await repository.getCareerSteps();
      if (!careerSteps?.length) {
        throw new CareerStepsNotFoundError();
      }

      return careerSteps;
    },
    catch(error: unknown) {
      return new CareerStepsNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseCareerStepsEffect = (careerSteps: unknown) =>
    Effect.try({
      try() {
        return careerStepListSchema.parse(careerSteps);
      },
      catch(_error: unknown) {
        return new ZodParseError('CareerSteps', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: careerSteps,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseCareerStepsEffect));
}
