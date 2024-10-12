import { z } from 'zod';

export const mediaSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number(),
  filename: z.string(),
  height: z.number(),
  needsLightBackground: z.boolean().optional().nullable(),
  mobile: z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    filename: z.string(),
    height: z.number(),
    needsLightBackground: z.boolean().optional().nullable(),
  }).optional().nullable()
});

export type Media = z.infer<typeof mediaSchema>;