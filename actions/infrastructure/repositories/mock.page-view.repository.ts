import { injectable } from 'inversify';
import { reduce } from 'lodash';
import { IPageViewRepository } from '../../application/repositories/page-view.repository.interface';
import { Blog, BlogViews } from '../../entities/models/blog';

@injectable()
export class MockPageViewRepository implements IPageViewRepository {
  async getViews(blogs: Array<Blog>): Promise<BlogViews> {
    return reduce(blogs, (result, blog) => ({
      ...result,
      [blog.slug]: blog.views
    }), {} as BlogViews);
  }
  async getViewsForBlog(blog: Blog): Promise<number> {
    return blog.views;
  }
  async incrementViews(slug: string): Promise<void> {
    return;
  }

  async isDuplicate(slug: string, hash?: string): Promise<boolean> {
    return false;
  }
}