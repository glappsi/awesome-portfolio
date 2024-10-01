import { ContainerModule, interfaces } from 'inversify';
import { DI_TYPES } from '../types';
import { PayloadPagesRepository } from '@/actions/infrastructure/repositories/payload.pages.repository';
import { PayloadProjectsRepository } from '@/actions/infrastructure/repositories/payload.projects.repository';
import { PayloadBlogsRepository } from '../../actions/infrastructure/repositories/payload.blogs.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind(DI_TYPES.IPagesRepository).to(PayloadPagesRepository);
  bind(DI_TYPES.IProjectsRepository).to(PayloadProjectsRepository);
  bind(DI_TYPES.IBlogsRepository).to(PayloadBlogsRepository);
};

export const ActionsModule = new ContainerModule(initializeModule);