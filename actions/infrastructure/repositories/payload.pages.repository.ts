import { injectable } from 'inversify';
import { IPagesRepository } from '../../application/repositories/pages.repository.interface';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { Page } from '../../entities/models/page';

@injectable()
export class PayloadPagesRepository implements IPagesRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getHero(): Promise<Page> {
    const payload = await this._getPayload();
    const pages = await payload.find({
      type: 'hero',
      collection: 'pages',
    });
    
    return pages?.docs?.[0] as Page;
  }
}