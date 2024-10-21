import { BlogDto, BlogWithDetailsDto } from '../../entities/models/blog';

export interface IBlogsRepository {
  getBlogs(): Promise<Array<BlogDto>>;
  getBlogsByType(type: BlogDto['type']): Promise<Array<BlogDto>>;
  getBlogBySlug(slug: string): Promise<BlogWithDetailsDto>;
}
