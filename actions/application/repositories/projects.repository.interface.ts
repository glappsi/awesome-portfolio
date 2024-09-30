import { Project } from '../../entities/models/project';

export interface IProjectsRepository {
  getProjects(): Promise<Array<Project>>;
}