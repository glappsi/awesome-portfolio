import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Project, projectListSchema } from '../../entities/models/project';
import { ProjectsNotFoundError } from '../../entities/errors/projects-not-found.error';

export function getProjectsUseCase(): Effect.Effect<Array<Project>, ProjectsNotFoundError | ZodParseError> {
  const repository = getInjection('IProjectsRepository');

  const program = Effect.tryPromise({
    async try() {
      const projects = await repository.getProjects();
      if (!projects) {
        throw new ProjectsNotFoundError();
      }

      return projects;
    },
    catch(error: unknown) {
      return new ProjectsNotFoundError()
    }
  });

  const parseProjectsEffect = (projects: unknown) =>
    Effect.try({
      try() {
        return projectListSchema.parse(projects);
      },
      catch(_error: unknown) {
        return new ZodParseError('Projects');
      },
    });

  return program.pipe(Effect.flatMap(parseProjectsEffect));
}