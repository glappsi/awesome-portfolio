import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IMessagesRepository } from '../../application/repositories/messages.repository.interface';
import { CreateMessageDto } from '../../entities/models/message';
import { getSafeLocale } from '@/i18n/utils';

@injectable()
export class PayloadMessagesRepository implements IMessagesRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async createMessage(dto: CreateMessageDto): Promise<number> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const result = await payload.create({
      collection: 'messages',
      locale,
      data: dto
    });

    return result.id;
  }
}