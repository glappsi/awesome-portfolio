import { z } from 'zod';

export const toolSchema = z.object({
  id: z.number(),
  name: z.string(),
  noIcon: z.boolean().optional().nullable(),
  displayName: z.string(),
  shortName: z.string().optional().nullable(),
});

export type Tool = z.infer<typeof toolSchema>;