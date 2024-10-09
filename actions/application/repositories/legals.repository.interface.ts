import { LegalDto } from '../../entities/models/legal';

export interface ILegalsRepository {
  getLegals(): Promise<Array<LegalDto>>;
  getLegalByType(type: LegalDto['type']): Promise<LegalDto>;
}
