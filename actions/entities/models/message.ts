import { z } from 'zod';

export const createMessageSchema = z.object({
  email: z.string(),
  message: z.string(),
});

export type CreateMessageDto = z.input<typeof createMessageSchema>;