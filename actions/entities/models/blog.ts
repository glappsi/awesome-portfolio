import { z } from 'zod';

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  published: z.boolean().optional().nullable(),
  type: z.string(),
});

export const blogDetailSchema = blogSchema.extend({
  paragraphs: z.array(z.object({
    headline: z.string(),
    content: z.array(z.any())
  }))
})

export type Blog = z.infer<typeof blogSchema>;
export type BlogWithDetails = z.infer<typeof blogDetailSchema>;