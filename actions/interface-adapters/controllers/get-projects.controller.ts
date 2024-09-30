import { Effect } from "effect";
import { getProjectsUseCase } from '../../application/use-cases/get-projects.use-case';
import { Project } from '../../entities/models/project';
import { ProjectsNotFoundError } from '../../entities/errors/projects-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';

function presenter(projects: Array<Project>) {
  return [
    ...projects
  ];
}

export function getProjectsController(): Effect.Effect<ReturnType<typeof presenter>, ProjectsNotFoundError | ZodParseError> {
  return Effect.map(
    getProjectsUseCase(), 
    (projects) => presenter(projects)
  );
}