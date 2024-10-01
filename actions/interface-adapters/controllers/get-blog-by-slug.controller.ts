import { Effect } from "effect";
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { BlogWithDetails } from '../../entities/models/blog';
import { BlogNotFoundError } from '../../entities/errors/blog-not-found.error';
import { getBlogBySlugUseCase } from '../../application/use-cases/get-blog-by-slug.use-case';
import { slateToHtml, payloadSlateToHtmlConfig } from '@slate-serializers/html';

function presenter(blog: BlogWithDetails) {
  return {
    ...blog,
    paragraphs: blog.paragraphs.map(p => ({
      ...p,
      html: slateToHtml(p.content, payloadSlateToHtmlConfig)
    }))
  }
}

export function getBlogBySlugController(slug: string): Effect.Effect<ReturnType<typeof presenter>, BlogNotFoundError | ZodParseError> {
  return Effect.map(
    getBlogBySlugUseCase(slug),
    (blog) => presenter(blog)
  );
}