import { z } from 'zod';
import { linkListSchema } from './link';

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string().optional().nullable(),
  slug: z.string(),
  author: z.string(),
  authorImage: z.object({
    url: z.string(),
    alt: z.string(),
  }).optional().nullable(),
  date: z.string().transform((str) => new Date(str)),
  published: z.boolean().optional().nullable(),
  type: z.string(),
});

export const blogDetailSchema = blogSchema.extend({
  links: linkListSchema.optional().nullable(),
  thumbnail: z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  }).optional().nullable(),
  gallery: z.array(z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  })).optional().nullable(),
  paragraphs: z.array(z.object({
    content: z.any(),
    markdown: z.string(),
    html: z.string(),
    render: z.enum(['html', 'markdown'])
  }))
})

export type Blog = z.infer<typeof blogSchema>;
export type BlogDto = z.input<typeof blogSchema>;
export type BlogWithDetails = z.infer<typeof blogDetailSchema>;
export type BlogWithDetailsDto = z.input<typeof blogDetailSchema>;