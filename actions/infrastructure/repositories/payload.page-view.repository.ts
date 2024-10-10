import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { injectable } from 'inversify';
import { reduce } from 'lodash';
import { IPageViewRepository } from '../../application/repositories/page-view.repository.interface';
import { Blog, BlogDto, BlogViews } from '../../entities/models/blog';

@injectable()
export class PayloadPageViewRepository implements IPageViewRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  async getViews(blogs: Array<Blog>): Promise<BlogViews> {
    return reduce(blogs, (result, blog) => ({
      ...result,
      [blog.slug]: blog.views
    }), {} as BlogViews);
  }

  async getViewsForBlog(blog: Blog): Promise<number> {
    return blog.views;
  }

  async incrementViews(slug: string, hash?: string): Promise<void> {
    const payload = await this._getPayload();
    const blog = await payload.find({
      collection: 'blogs', // Replace 'posts' with your collection slug
      where: {
        slug: {
          equals: slug
        }
      },
    });
    if (!blog.docs?.length) {
      return;
    }

    const { id, views } = (blog.docs[0] as BlogDto);
    const result = await payload.update({
      collection: 'blogs',
      id,
      data: {
        views: views ? views + 1 : 1
      },
    });
  }

  async isDuplicate(slug: string, hash?: string): Promise<boolean> {
    return false;
  }
}