import { CreateMessageDto } from '../../entities/models/message';

export interface IMessagesRepository {
  createMessage(dto: CreateMessageDto): Promise<number>;
}
