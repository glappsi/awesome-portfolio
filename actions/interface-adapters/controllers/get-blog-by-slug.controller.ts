import { Effect } from "effect";
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { BlogWithDetails } from '../../entities/models/blog';
import { BlogNotFoundError } from '../../entities/errors/blog-not-found.error';
import { getBlogBySlugUseCase } from '../../application/use-cases/get-blog-by-slug.use-case';

function presenter(blog: BlogWithDetails) {
  return {
    ...blog,
  }
}

export function getBlogBySlugController(slug: string): Effect.Effect<ReturnType<typeof presenter>, BlogNotFoundError | ZodParseError> {
  return Effect.map(
    getBlogBySlugUseCase(slug),
    (blog) => presenter(blog)
  );
}