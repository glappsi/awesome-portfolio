import { z } from 'zod';
import { categorySchema } from './category';
import { toolSchema } from './tool';
import { blogSchema } from './blog';

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  start: z.string().transform((str) => new Date(str)),  // Parse ISO string to Date
  end: z.string().transform((str) => new Date(str)).optional(),
  published: z.boolean().optional().nullable(),
  blog: blogSchema,
  categories: z.array(categorySchema),
  tools: z.array(toolSchema),
});
export const projectListSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;