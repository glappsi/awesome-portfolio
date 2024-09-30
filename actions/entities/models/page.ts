import { z } from 'zod';

export const pageSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  hero: z.object({
    url: z.string(),
    alt: z.string(),
  }).optional(),
});
export type Page = z.infer<typeof pageSchema>;