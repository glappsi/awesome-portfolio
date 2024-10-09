import { BlogWithDetailsDto } from '../../entities/models/blog';

export interface IBlogsRepository {
  getBlogBySlug(slug: string): Promise<BlogWithDetailsDto>;
}
