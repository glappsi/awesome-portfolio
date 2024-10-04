import { ContainerModule, interfaces } from 'inversify';
import { DI_TYPES } from '../types';
import { PayloadProjectsRepository } from '@/actions/infrastructure/repositories/payload.projects.repository';
import { PayloadBlogsRepository } from '../../actions/infrastructure/repositories/payload.blogs.repository';
import { PayloadProfilesRepository } from '../../actions/infrastructure/repositories/payload.profiles.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind(DI_TYPES.IProjectsRepository).to(PayloadProjectsRepository);
  bind(DI_TYPES.IBlogsRepository).to(PayloadBlogsRepository);
  bind(DI_TYPES.IProfilesRepository).to(PayloadProfilesRepository);
};

export const ActionsModule = new ContainerModule(initializeModule);