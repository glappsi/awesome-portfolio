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
  }).optional(),
  links: linkListSchema.optional().nullable(),
  date: z.string().transform((str) => new Date(str)),
  published: z.boolean().optional().nullable(),
  type: z.string(),
});

export const blogDetailSchema = blogSchema.extend({
  paragraphs: z.array(z.object({
    content: z.any(),
    markdown: z.string(),
    html: z.string(),
    render: z.enum(['html', 'markdown'])
  }))
})

export type Blog = z.infer<typeof blogSchema>;
export type BlogWithDetails = z.infer<typeof blogDetailSchema>;