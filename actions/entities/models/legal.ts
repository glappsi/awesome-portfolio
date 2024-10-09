import { z } from 'zod';

export const legalSchema = z.object({
  id: z.number(),
  content: z.any(),
  markdown: z.string(),
  html: z.string(),
  render: z.enum(['html', 'markdown']),
  type: z.enum(['imprint', 'privacy']),
});

export const legalListSchema = z.array(legalSchema);

export type Legal = z.infer<typeof legalSchema>;
export type LegalDto = z.input<typeof legalSchema>;
