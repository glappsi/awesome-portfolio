import { CreateMessage, Message } from '../../entities/models/message';

export interface IMessagesRepository {
  createMessage(dto: CreateMessage): Promise<number>;
}