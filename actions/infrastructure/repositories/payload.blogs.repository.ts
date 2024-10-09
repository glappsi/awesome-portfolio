import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IBlogsRepository } from '../../application/repositories/blogs.repository.interface';
import { BlogWithDetailsDto } from '../../entities/models/blog';
import { getSafeLocale } from '@/i18n/utils';

@injectable()
export class PayloadBlogsRepository implements IBlogsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getBlogBySlug(slug: string): Promise<BlogWithDetailsDto> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const blog = await payload.find({
      collection: 'blogs',
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return blog.docs?.[0] as BlogWithDetailsDto;
  }
}
