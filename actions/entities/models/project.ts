import { z } from 'zod';
import { blogSchema } from './blog';
import { categorySchema } from './category';
import { mediaSchema } from './media';
import { toolSchema } from './tool';

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  start: z.string().transform((str) => new Date(str)), // Parse ISO string to Date
  end: z
    .string()
    .transform((str) => new Date(str))
    .optional()
    .nullable(),
  published: z.boolean().optional().nullable(),
  highlight: z.boolean().optional().nullable(),
  type: z.enum(['profession', 'hobby']),
  badge: mediaSchema
    .optional()
    .nullable(),
  blog: blogSchema.optional().nullable(),
  categories: z.array(categorySchema),
  tools: z.array(toolSchema),
});
export const projectListSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
export type ProjectDto = z.input<typeof projectSchema>;
