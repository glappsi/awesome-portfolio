import { generateBlogDetailDto } from '@/mock/data';
import { injectable } from 'inversify';
import { IBlogsRepository } from '../../application/repositories/blogs.repository.interface';
import { BlogWithDetailsDto } from '../../entities/models/blog';

@injectable()
export class MockBlogsRepository implements IBlogsRepository {
  async getBlogBySlug(slug: string): Promise<BlogWithDetailsDto> {
    return generateBlogDetailDto();
  }
}
