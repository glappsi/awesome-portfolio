import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { ProjectDto } from '../../entities/models/project';
import { IProjectsRepository } from '../../application/repositories/projects.repository.interface';
import { BlogDto } from '../../entities/models/blog';
import { Blog } from '../../../payload-types';

@injectable()
export class PayloadProjectsRepository implements IProjectsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getProjects(): Promise<Array<ProjectDto>> {
    const payload = await this._getPayload();
    const projects = await payload.find({
      collection: 'projects',
      limit: 0,
      depth: 1,
      sort: '-end'
    });
    for (const project of projects?.docs) {
      if ((project.blog as BlogDto)?.authorImage) {
         const media = await payload.findByID({
          collection: 'media',
          id: (project.blog as {authorImage:number}).authorImage
        });
        if (typeof media.url === "string") {
          (project.blog as Blog).authorImage = media;
        }
      }
    }
    
    return projects?.docs as Array<ProjectDto>;
  }
}