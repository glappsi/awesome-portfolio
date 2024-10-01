import { BlogWithDetails } from '../../entities/models/blog';

export interface IBlogsRepository {
  getBlogBySlug(slug: string): Promise<BlogWithDetails>;
}