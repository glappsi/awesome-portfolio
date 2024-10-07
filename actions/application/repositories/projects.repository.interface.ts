import { ProjectDto } from '../../entities/models/project';

export interface IProjectsRepository {
  getProjects(): Promise<Array<ProjectDto>>;
}