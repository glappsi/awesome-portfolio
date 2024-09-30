import { IPagesRepository } from '@/actions/application/repositories/pages.repository.interface';

export const DI_TYPES = {
  IPagesRepository: Symbol.for("IPagesRepository"),
};

export interface DI_RETURN_TYPES {
  IPagesRepository: IPagesRepository,
}
