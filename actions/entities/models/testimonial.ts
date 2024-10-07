import { z } from 'zod';

export const testimonialSchema = z.object({
  id: z.number(),
  quote: z.string(),
  author: z.string(),
  description: z.string(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
    needsLightBackground: z.boolean().optional().nullable()
  }).optional().nullable(),
});
export const testimonialListSchema = z.array(testimonialSchema);

export type Testimonial = z.infer<typeof testimonialSchema>;
export type TestimonialDto = z.input<typeof testimonialSchema>;