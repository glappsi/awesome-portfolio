import { Blog, BlogViews } from '../../entities/models/blog';

export interface IPageViewRepository {
  getViews(blogs: Array<Blog>): Promise<BlogViews>;
  getViewsForBlog(blog: Blog): Promise<number>;
  incrementViews(slug: string): Promise<void>;
  isDuplicate(slug: string, hash?: string): Promise<boolean>;
}