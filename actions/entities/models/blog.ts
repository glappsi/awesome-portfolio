import { z } from 'zod';
import { linkListSchema } from './link';
import { mediaSchema } from './media';

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
  slug: z.string(),
  author: z.string(),
  authorImage: mediaSchema
    .optional()
    .nullable(),
  thumbnail: mediaSchema
    .optional()
    .nullable(),
  date: z.string().transform((str) => new Date(str)),
  published: z.boolean().optional().nullable(),
  views: z.number(),
  type: z.string(),
});

export const blogDetailSchema = blogSchema.extend({
  links: linkListSchema.optional().nullable(),
  gallery: z
    .array(
      mediaSchema
    )
    .optional()
    .nullable(),
  paragraphs: z.array(
    z.object({
      content: z.any(),
      markdown: z.string(),
      html: z.string(),
      render: z.enum(['html', 'markdown']),
    }),
  ),
});

export const blogListSchema = z.array(blogSchema);

export type Blog = z.infer<typeof blogSchema>;
export type BlogDto = z.input<typeof blogSchema>;
export type BlogWithDetails = z.infer<typeof blogDetailSchema>;
export type BlogWithDetailsDto = z.input<typeof blogDetailSchema>;
export type BlogViews = { [slug: string]: number };