import { generateLegalDto, generateLegalDtos } from '@/mock/data';
import { injectable } from 'inversify';
import { ILegalsRepository } from '../../application/repositories/legals.repository.interface';
import { LegalDto } from '../../entities/models/legal';

@injectable()
export class MockLegalsRepository implements ILegalsRepository {
  async getLegals(): Promise<Array<LegalDto>> {
    return generateLegalDtos()
  }

  async getLegalByType(type: LegalDto['type']): Promise<LegalDto> {
    return generateLegalDto(type);
  }
}
