import { z } from 'zod';
import { categorySchema } from './category';
import { toolSchema } from './tool';

export const careerStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  company: z.string(),
  description: z.string().optional(),
  start: z.string().transform((str) => new Date(str)),  // Parse ISO string to Date
  end: z.string().transform((str) => new Date(str)).optional().nullable(),
  projects: z.array(z.object({
    categories: z.array(categorySchema),
    tools: z.array(toolSchema),
  })),
  categories: z.array(categorySchema),
  tools: z.array(toolSchema),
});
export const careerStepListSchema = z.array(careerStepSchema);

export type CareerStep = z.infer<typeof careerStepSchema>;