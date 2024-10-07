import { z } from 'zod';

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  location: z.string().optional().nullable(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  aboutMe: z.string().optional().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfileDto = z.input<typeof profileSchema>;