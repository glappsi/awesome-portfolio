import { Effect } from "effect";
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { BlogWithDetails } from '../../entities/models/blog';
import { BlogNotFoundError } from '../../entities/errors/blog-not-found.error';
import { getBlogBySlugUseCase } from '../../application/use-cases/get-blog-by-slug.use-case';
import { staticImage, staticImages } from '@/lib/images';

function presenter(blog: BlogWithDetails) {
  return {
    ...blog,
    gallery: staticImages(blog.gallery),
    authorImage: staticImage(blog.authorImage)
  }
}

export function getBlogBySlugController(slug: string): Effect.Effect<ReturnType<typeof presenter>, BlogNotFoundError | ZodParseError> {
  return Effect.map(
    getBlogBySlugUseCase(slug),
    (blog) => presenter(blog)
  );
}