import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { CreateMessage, createMessageSchema } from '../../entities/models/message';
import { MessageCouldNotBeCreatedError } from '../../entities/errors/message-could-not-be-created.error';

export function createMessageUseCase(dto: CreateMessage): Effect.Effect<number, MessageCouldNotBeCreatedError | ZodParseError> {
  const repository = getInjection('IMessagesRepository');

  const program = Effect.try({
    try() {
      return createMessageSchema.parse(dto);
    },
    catch(_error: unknown) {
      return new ZodParseError('Message', {
        originalError: _error,
        data: dto
      });
    },
  });

  const sendMessageEffect = (dto: CreateMessage) =>
    Effect.tryPromise({
      async try() {
        const id = await repository.createMessage(dto);
        if (!id) {
          throw new MessageCouldNotBeCreatedError();
        }

        return id;
      },
      catch(error: unknown) {
        return new MessageCouldNotBeCreatedError()
      }
    });

  return program.pipe(Effect.flatMap(sendMessageEffect));
}