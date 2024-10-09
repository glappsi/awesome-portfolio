import { PayloadProjectsRepository } from '@/actions/infrastructure/repositories/payload.projects.repository';
import { ContainerModule, interfaces } from 'inversify';
import { MockBlogsRepository } from '../../actions/infrastructure/repositories/mock.blogs.repository';
import { MockLegalsRepository } from '../../actions/infrastructure/repositories/mock.legals.repository';
import { MockMessagesRepository } from '../../actions/infrastructure/repositories/mock.messages.repository';
import { MockProfilesRepository } from '../../actions/infrastructure/repositories/mock.profiles.repository';
import { MockProjectsRepository } from '../../actions/infrastructure/repositories/mock.projects.repository';
import { PayloadBlogsRepository } from '../../actions/infrastructure/repositories/payload.blogs.repository';
import { PayloadLegalsRepository } from '../../actions/infrastructure/repositories/payload.legals.repository';
import { PayloadMessagesRepository } from '../../actions/infrastructure/repositories/payload.messages.repository';
import { PayloadProfilesRepository } from '../../actions/infrastructure/repositories/payload.profiles.repository';
import { DI_TYPES } from '../types';

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.ENVIRONMENT === 'testing') {
    bind(DI_TYPES.IProjectsRepository).to(MockProjectsRepository);
    bind(DI_TYPES.IBlogsRepository).to(MockBlogsRepository);
    bind(DI_TYPES.IProfilesRepository).to(MockProfilesRepository);
    bind(DI_TYPES.IMessagesRepository).to(MockMessagesRepository);
    bind(DI_TYPES.ILegalsRepository).to(MockLegalsRepository);
    return;
  }

  bind(DI_TYPES.IProjectsRepository).to(PayloadProjectsRepository);
  bind(DI_TYPES.IBlogsRepository).to(PayloadBlogsRepository);
  bind(DI_TYPES.IProfilesRepository).to(PayloadProfilesRepository);
  bind(DI_TYPES.IMessagesRepository).to(PayloadMessagesRepository);
  bind(DI_TYPES.ILegalsRepository).to(PayloadLegalsRepository);
};

export const ActionsModule = new ContainerModule(initializeModule);
