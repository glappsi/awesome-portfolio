import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { Project } from '../../entities/models/project';
import { IProjectsRepository } from '../../application/repositories/projects.repository.interface';

@injectable()
export class PayloadProjectsRepository implements IProjectsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getProjects(): Promise<Array<Project>> {
    const payload = await this._getPayload();
    const projects = await payload.find({
      collection: 'projects',
      limit: 0,
      depth: 1,
      sort: '-end'
    });
    for (const project of projects?.docs) {
      if (project.blog?.authorImage) {
        project.blog.authorImage = await payload.findByID({
          collection: 'media',
          id: project.blog.authorImage
        });
      }
    }
    
    return projects?.docs as Array<Project>;
  }
}