import { ContainerModule, interfaces } from 'inversify';
import { DI_TYPES } from '../types';
import { PayloadPagesRepository } from '@/actions/infrastructure/repositories/payload.pages.repository';
import { PayloadProjectsRepository } from '@/actions/infrastructure/repositories/payload.projects.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind(DI_TYPES.IPagesRepository).to(PayloadPagesRepository);
  bind(DI_TYPES.IProjectsRepository).to(PayloadProjectsRepository);
};

export const ActionsModule = new ContainerModule(initializeModule);