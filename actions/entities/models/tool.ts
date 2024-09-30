import { z } from 'zod';

export const toolSchema = z.object({
  id: z.number(),
  name: z.string(),
  displayName: z.string(),
});

export type Tool = z.infer<typeof toolSchema>;