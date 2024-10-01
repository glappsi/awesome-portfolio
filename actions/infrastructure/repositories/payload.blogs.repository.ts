import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IBlogsRepository } from '../../application/repositories/blogs.repository.interface';
import { BlogWithDetails } from '../../entities/models/blog';

@injectable()
export class PayloadBlogsRepository implements IBlogsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getBlogBySlug(slug: string): Promise<BlogWithDetails> {
    const payload = await this._getPayload();
    const blog = await payload.find({
      collection: 'blogs',
      slug
    });

    return blog.docs?.[0] as BlogWithDetails;
  }
}