import { IPagesRepository } from '@/actions/application/repositories/pages.repository.interface';
import { IProjectsRepository } from '@/actions/application/repositories/projects.repository.interface';

export const DI_TYPES = {
  IPagesRepository: Symbol.for("IPagesRepository"),
  IProjectsRepository: Symbol.for("IProjectsRepository"),
};

export interface DI_RETURN_TYPES {
  IPagesRepository: IPagesRepository,
  IProjectsRepository: IProjectsRepository,
}
