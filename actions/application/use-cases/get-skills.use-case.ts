import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { SkillsNotFoundError } from '../../entities/errors/skills-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Skill, skillListSchema } from '../../entities/models/skill';

export function getSkillsUseCase(): Effect.Effect<
  Array<Skill>,
  SkillsNotFoundError | ZodParseError
> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const skills = await repository.getSkills();
      if (!skills?.length) {
        throw new SkillsNotFoundError();
      }

      return skills;
    },
    catch(error: unknown) {
      return new SkillsNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseSkillsEffect = (skills: unknown) =>
    Effect.try({
      try() {
        return skillListSchema.parse(skills);
      },
      catch(_error: unknown) {
        return new ZodParseError('Skills', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: skills,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseSkillsEffect));
}
