import { getSafeLocale } from '@/i18n/utils';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { injectable } from 'inversify';
import { Blog } from '../../../payload-types';
import { IProjectsRepository } from '../../application/repositories/projects.repository.interface';
import { BlogDto } from '../../entities/models/blog';
import { ProjectDto } from '../../entities/models/project';

@injectable()
export class PayloadProjectsRepository implements IProjectsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() { }

  async getProjects(): Promise<Array<ProjectDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const projects = await payload.find({
      collection: 'projects',
      limit: 0,
      depth: 1,
      locale,
      sort: '-end',
      where: {
        published: {
          equals: true
        }
      }
    });
    for (const project of projects?.docs) {
      if ((project.blog as BlogDto)?.authorImage) {
        const media = await payload.findByID({
          collection: 'media',
          locale,
          id: (project.blog as { authorImage: number }).authorImage,
        });
        if (typeof media.url === 'string') {
          (project.blog as Blog).authorImage = media;
        }
      }

      if ((project.blog as BlogDto)?.thumbnail) {
        const media = await payload.findByID({
          collection: 'media',
          locale,
          id: (project.blog as { thumbnail: number }).thumbnail,
        });
        if (typeof media.url === 'string') {
          (project.blog as Blog).thumbnail = media;
        }
      }
    }

    return projects?.docs as Array<ProjectDto>;
  }
}
