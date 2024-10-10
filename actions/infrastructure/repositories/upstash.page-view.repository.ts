import { Redis } from '@upstash/redis';
import { injectable } from 'inversify';
import { IPageViewRepository } from '../../application/repositories/page-view.repository.interface';
import { Blog, BlogViews } from '../../entities/models/blog';

@injectable()
export class UpstashPageViewRepository implements IPageViewRepository {
  redis = Redis.fromEnv();

  async getViews(blogs: Array<Blog>): Promise<BlogViews> {
    return (
      await this.redis.mget<number[]>(
        ...blogs.map((b) =>
          ['pageviews', 'projects', b.slug].join(':'),
        ),
      )
    ).reduce(
      (acc, v, i) => {
        acc[blogs[i].slug] = v ?? 0;
        return acc;
      },
      {} as BlogViews,
    );
  }

  async getViewsForBlog(blog: Blog): Promise<number> {
    return (await this.redis.get<number>(['pageviews', 'projects', blog.slug].join(':'))) ?? 0;
  }

  async incrementViews(slug: string): Promise<void> {
    await this.redis.incr(['pageviews', 'projects', slug].join(':'));
  }

  async isDuplicate(slug: string, hash?: string): Promise<boolean> {
    if (!hash) {
      return false;
    }

    const isNew = await this.redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    return !isNew;
  }
}