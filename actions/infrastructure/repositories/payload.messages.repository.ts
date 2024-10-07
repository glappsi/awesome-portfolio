import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IMessagesRepository } from '../../application/repositories/messages.repository.interface';
import { CreateMessageDto } from '../../entities/models/message';

@injectable()
export class PayloadMessagesRepository implements IMessagesRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async createMessage(dto: CreateMessageDto): Promise<number> {
    const payload = await this._getPayload();
    const result = await payload.create({
      collection: 'messages',
      data: dto
    });

    return result.id;
  }
}