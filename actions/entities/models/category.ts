import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  displayName: z.string(),
});

export type Category = z.infer<typeof categorySchema>;