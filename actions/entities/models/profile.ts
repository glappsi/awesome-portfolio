import { z } from 'zod';

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  langitude: z.number().optional(),
  longitude: z.number().optional(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  aboutMe: z.string().optional().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;