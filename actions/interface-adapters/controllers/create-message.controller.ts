import { Effect } from "effect";
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { CreateMessage } from '../../entities/models/message';
import { createMessageUseCase } from '../../application/use-cases/create-message.use-case';
import { MessageCouldNotBeCreatedError } from '../../entities/errors/message-could-not-be-created.error';

function presenter(id: number) {
  return {
    id
  }
}

export function createMessageController(dto: CreateMessage): Effect.Effect<ReturnType<typeof presenter>, MessageCouldNotBeCreatedError | ZodParseError> {
  return Effect.map(
    createMessageUseCase(dto), 
    (id) => presenter(id)
  );
}