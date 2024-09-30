import { z } from 'zod';

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  published: z.boolean().optional().nullable(),
  type: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;