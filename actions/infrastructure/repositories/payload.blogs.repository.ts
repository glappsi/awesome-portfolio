import { getSafeLocale } from '@/i18n/utils';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { injectable } from 'inversify';
import { IBlogsRepository } from '../../application/repositories/blogs.repository.interface';
import { BlogDto, BlogWithDetailsDto } from '../../entities/models/blog';

@injectable()
export class PayloadBlogsRepository implements IBlogsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() { }

  async getBlogs(): Promise<Array<BlogDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const blog = await payload.find({
      collection: 'blogs',
      locale
    });

    return blog.docs as Array<BlogDto>;
  }

  async getBlogsByType(type: BlogDto['type']): Promise<Array<BlogDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const blog = await payload.find({
      collection: 'blogs',
      locale,
      where: {
        type: {
          equals: type,
        },
      },
    });

    return blog.docs as Array<BlogDto>;
  }

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
