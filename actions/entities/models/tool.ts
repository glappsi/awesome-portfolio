import { z } from 'zod';

export const toolSchema = z.object({
  id: z.number(),
  name: z.string(),
  hideInTopSkills: z.boolean().optional().nullable(),
  displayName: z.string(),
  shortName: z.string().optional().nullable(),
});

export type Tool = z.infer<typeof toolSchema>;
export type ToolDto = z.input<typeof toolSchema>;
