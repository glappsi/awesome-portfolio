import { Effect } from "effect";
import { SkillsNotFoundError } from '../../entities/errors/skills-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Skill } from '../../entities/models/skill';
import { getSkillsUseCase } from '../../application/use-cases/get-skills.use-case';

function presenter(skills: Array<Skill>) {
  return [
    ...skills
  ];
}

export function getSkillsController(): Effect.Effect<ReturnType<typeof presenter>, SkillsNotFoundError | ZodParseError> {
  return Effect.map(
    getSkillsUseCase(), 
    (skills) => presenter(skills)
  );
}