import { ContainerModule, interfaces } from 'inversify';
import { DI_TYPES } from '../types';
import { PayloadProjectsRepository } from '@/actions/infrastructure/repositories/payload.projects.repository';
import { PayloadBlogsRepository } from '../../actions/infrastructure/repositories/payload.blogs.repository';
import { PayloadProfilesRepository } from '../../actions/infrastructure/repositories/payload.profiles.repository';
import { PayloadMessagesRepository } from '../../actions/infrastructure/repositories/payload.messages.repository';
import { PayloadLegalsRepository } from '../../actions/infrastructure/repositories/payload.legals.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind(DI_TYPES.IProjectsRepository).to(PayloadProjectsRepository);
  bind(DI_TYPES.IBlogsRepository).to(PayloadBlogsRepository);
  bind(DI_TYPES.IProfilesRepository).to(PayloadProfilesRepository);
  bind(DI_TYPES.IMessagesRepository).to(PayloadMessagesRepository);
  bind(DI_TYPES.ILegalsRepository).to(PayloadLegalsRepository);
};

export const ActionsModule = new ContainerModule(initializeModule);