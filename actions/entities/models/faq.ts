import { z } from 'zod';

export const faqSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});
export const faqListSchema = z.array(faqSchema);

export type FAQ = z.infer<typeof faqSchema>;
export type FAQDto = z.input<typeof faqSchema>;
