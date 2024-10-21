import { generateBlogDetailDto, generateBlogDtos } from '@/mock/data';
import { injectable } from 'inversify';
import { IBlogsRepository } from '../../application/repositories/blogs.repository.interface';
import { BlogDto, BlogWithDetailsDto } from '../../entities/models/blog';

@injectable()
export class MockBlogsRepository implements IBlogsRepository {
  async getBlogs(): Promise<Array<BlogDto>> {
    return generateBlogDtos();
  }

  async getBlogsByType(type: BlogDto['type']): Promise<Array<BlogDto>> {
    return generateBlogDtos();
  }

  async getBlogBySlug(slug: string): Promise<BlogWithDetailsDto> {
    return generateBlogDetailDto();
  }
}
