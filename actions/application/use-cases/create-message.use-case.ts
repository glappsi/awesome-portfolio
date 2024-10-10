import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { MessageCouldNotBeCreatedError } from '../../entities/errors/message-could-not-be-created.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import {
  CreateMessageDto,
  createMessageSchema,
} from '../../entities/models/message';

export function createMessageUseCase(
  dto: CreateMessageDto,
): Effect.Effect<number, MessageCouldNotBeCreatedError | ZodParseError> {
  const repository = getInjection('IMessagesRepository');

  const program = Effect.try({
    try() {
      return createMessageSchema.parse(dto);
    },
    catch(_error: unknown) {
      return new ZodParseError('Message', {
        originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
        data: dto,
      });
    },
  });

  const sendMessageEffect = (dto: CreateMessageDto) =>
    Effect.tryPromise({
      async try() {
        const id = await repository.createMessage(dto);
        if (!id) {
          throw new MessageCouldNotBeCreatedError();
        }

        return id;
      },
      catch(error: unknown) {
        return new MessageCouldNotBeCreatedError({
          originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
      },
    });

  return program.pipe(Effect.flatMap(sendMessageEffect));
}
