import { injectable } from 'inversify';
import { generateCreatedMessageDto } from '../../../mock/data';
import { IMessagesRepository } from '../../application/repositories/messages.repository.interface';
import { CreateMessageDto } from '../../entities/models/message';

@injectable()
export class MockMessagesRepository implements IMessagesRepository {
  async createMessage(dto: CreateMessageDto): Promise<number> {
    return generateCreatedMessageDto();
  }
}
