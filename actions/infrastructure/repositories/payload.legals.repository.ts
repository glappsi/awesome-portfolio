import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { getSafeLocale } from '@/i18n/utils';
import { ILegalsRepository } from '../../application/repositories/legals.repository.interface';
import { LegalDto } from '../../entities/models/legal';

@injectable()
export class PayloadLegalsRepository implements ILegalsRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getLegals(): Promise<Array<LegalDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const legals = await payload.find({
      collection: 'legals',
      locale
    });
    
    return legals?.docs as Array<LegalDto>;
  }

  async getLegalByType(type: LegalDto['type']): Promise<LegalDto> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const legals = await payload.find({
      collection: 'legals',
      locale,
      where: {
        type: {
          equals: type
        }
      }
    });
    
    return legals?.docs[0] as LegalDto;
  }
}