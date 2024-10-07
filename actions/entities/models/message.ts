import { z } from 'zod';

export const createMessageSchema = z.object({
  email: z.string(),
  message: z.string(),
});

export const messageSchema = createMessageSchema.extend({
  id: z.number(),
});

export type CreateMessage = z.infer<typeof createMessageSchema>;
export type Message = z.infer<typeof messageSchema>;