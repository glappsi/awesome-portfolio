import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { ProjectsNotFoundError } from '../../entities/errors/projects-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Project, projectListSchema } from '../../entities/models/project';

export function getProjectsUseCase(): Effect.Effect<
  Array<Project>,
  ProjectsNotFoundError | ZodParseError
> {
  const repository = getInjection('IProjectsRepository');

  const program = Effect.tryPromise({
    async try() {
      const projects = await repository.getProjects();
      if (!projects?.length) {
        throw new ProjectsNotFoundError();
      }

      return projects;
    },
    catch(error: unknown) {
      return new ProjectsNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseProjectsEffect = (projects: unknown) =>
    Effect.try({
      try() {
        return projectListSchema.parse(projects);
      },
      catch(_error: unknown) {
        return new ZodParseError('Projects', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: projects,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseProjectsEffect));
}
