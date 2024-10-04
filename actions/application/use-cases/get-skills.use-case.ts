import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Skill, skillListSchema } from '../../entities/models/skill';
import { SkillsNotFoundError } from '../../entities/errors/skills-not-found.error';

export function getSkillsUseCase(): Effect.Effect<Array<Skill>, SkillsNotFoundError | ZodParseError> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const skills = await repository.getSkills();
      if (!skills) {
        throw new SkillsNotFoundError();
      }

      return skills;
    },
    catch(error: unknown) {
      return new SkillsNotFoundError()
    }
  });

  const parseSkillsEffect = (skills: unknown) =>
    Effect.try({
      try() {
        return skillListSchema.parse(skills);
      },
      catch(_error: unknown) {
        return new ZodParseError('Skills', {
          originalError: _error,
          data: skills
        });
      },
    });

  return program.pipe(Effect.flatMap(parseSkillsEffect));
}