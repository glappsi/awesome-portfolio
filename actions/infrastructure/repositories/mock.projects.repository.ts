import { generateProjectDtos } from '@/mock/data';
import { injectable } from 'inversify';
import { IProjectsRepository } from '../../application/repositories/projects.repository.interface';
import { ProjectDto } from '../../entities/models/project';

@injectable()
export class MockProjectsRepository implements IProjectsRepository {
  async getProjects(): Promise<Array<ProjectDto>> {
    return generateProjectDtos();
  }
}
