import { Effect } from "effect";
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Skill } from '../../entities/models/skill';
import { CareerStepsNotFoundError } from '../../entities/errors/career-steps-not-found.error';
import { getCareerStepsUseCase } from '../../application/use-cases/get-career-steps.use-case';
import { CareerStep } from '../../entities/models/career-step';

function presenter(careerSteps: Array<CareerStep>) {
  return [
    ...careerSteps
  ];
}

export function getCareerStepsController(): Effect.Effect<ReturnType<typeof presenter>, CareerStepsNotFoundError | ZodParseError> {
  return Effect.map(
    getCareerStepsUseCase(), 
    (careerSteps) => presenter(careerSteps)
  );
}