import { z } from 'zod';
import { mediaSchema } from './media';

export const testimonialSchema = z.object({
  id: z.number(),
  quote: z.string(),
  author: z.string(),
  description: z.string(),
  avatar: mediaSchema
    .optional()
    .nullable(),
});
export const testimonialListSchema = z.array(testimonialSchema);

export type Testimonial = z.infer<typeof testimonialSchema>;
export type TestimonialDto = z.input<typeof testimonialSchema>;
