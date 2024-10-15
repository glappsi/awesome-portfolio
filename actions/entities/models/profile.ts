import { z } from 'zod';
import { mediaSchema } from './media';

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  keywords: z.string().optional().nullable(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  location: z.string().optional().nullable(),
  image: mediaSchema,
  badge: mediaSchema.optional().nullable(),
  aboutMe: z.string().optional().nullable(),
  openForWork: z.boolean().optional().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfileDto = z.input<typeof profileSchema>;
