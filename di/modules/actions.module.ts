import { PayloadProjectsRepository } from '@/actions/infrastructure/repositories/payload.projects.repository';
import { isTesting, upstashEnabled } from '@/lib/env';
import { ContainerModule, interfaces } from 'inversify';
import { MockBlogsRepository } from '../../actions/infrastructure/repositories/mock.blogs.repository';
import { MockLegalsRepository } from '../../actions/infrastructure/repositories/mock.legals.repository';
import { MockMessagesRepository } from '../../actions/infrastructure/repositories/mock.messages.repository';
import { MockPageViewRepository } from '../../actions/infrastructure/repositories/mock.page-view.repository';
import { MockProfilesRepository } from '../../actions/infrastructure/repositories/mock.profiles.repository';
import { MockProjectsRepository } from '../../actions/infrastructure/repositories/mock.projects.repository';
import { PayloadBlogsRepository } from '../../actions/infrastructure/repositories/payload.blogs.repository';
import { PayloadLegalsRepository } from '../../actions/infrastructure/repositories/payload.legals.repository';
import { PayloadMessagesRepository } from '../../actions/infrastructure/repositories/payload.messages.repository';
import { PayloadPageViewRepository } from '../../actions/infrastructure/repositories/payload.page-view.repository';
import { PayloadProfilesRepository } from '../../actions/infrastructure/repositories/payload.profiles.repository';
import { UpstashPageViewRepository } from '../../actions/infrastructure/repositories/upstash.page-view.repository';
import { PageViewService } from '../../actions/infrastructure/services/page-view.service';
import { DI_TYPES } from '../types';

const initializeModule = (bind: interfaces.Bind) => {
  // General dependencies
  bind(DI_TYPES.IPageViewService).to(PageViewService);

  // Testing dependencies
  if (isTesting) {
    bind(DI_TYPES.IProjectsRepository).to(MockProjectsRepository);
    bind(DI_TYPES.IBlogsRepository).to(MockBlogsRepository);
    bind(DI_TYPES.IProfilesRepository).to(MockProfilesRepository);
    bind(DI_TYPES.IMessagesRepository).to(MockMessagesRepository);
    bind(DI_TYPES.ILegalsRepository).to(MockLegalsRepository);
    bind(DI_TYPES.IPageViewRepository).to(MockPageViewRepository);
    return;
  }

  // Payload dependencies
  bind(DI_TYPES.IProjectsRepository).to(PayloadProjectsRepository);
  bind(DI_TYPES.IBlogsRepository).to(PayloadBlogsRepository);
  bind(DI_TYPES.IProfilesRepository).to(PayloadProfilesRepository);
  bind(DI_TYPES.IMessagesRepository).to(PayloadMessagesRepository);
  bind(DI_TYPES.ILegalsRepository).to(PayloadLegalsRepository);

  // Conditional dependencies
  if (upstashEnabled) {
    bind(DI_TYPES.IPageViewRepository).to(UpstashPageViewRepository);
  } else {
    bind(DI_TYPES.IPageViewRepository).to(PayloadPageViewRepository);
  }
};

export const ActionsModule = new ContainerModule(initializeModule);
