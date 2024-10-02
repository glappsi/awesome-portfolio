import { z } from 'zod';
import { categorySchema } from './category';
import { toolSchema } from './tool';

export const skillSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.enum(['profession', 'soft']),
  categories: z.array(categorySchema),
  tools: z.array(toolSchema),
});
export const skillListSchema = z.array(skillSchema);

export type Skill = z.infer<typeof skillSchema>;