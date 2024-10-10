import { IProjectsRepository } from '@/actions/application/repositories/projects.repository.interface';
import { IBlogsRepository } from '../actions/application/repositories/blogs.repository.interface';
import { ILegalsRepository } from '../actions/application/repositories/legals.repository.interface';
import { IMessagesRepository } from '../actions/application/repositories/messages.repository.interface';
import { IPageViewRepository } from '../actions/application/repositories/page-view.repository.interface';
import { IProfilesRepository } from '../actions/application/repositories/profiles.repository.interface';
import { IPageViewService } from '../actions/application/services/page-view.service.interface';

export const DI_TYPES = {
  IProjectsRepository: Symbol.for('IProjectsRepository'),
  IBlogsRepository: Symbol.for('IBlogsRepository'),
  IProfilesRepository: Symbol.for('IProfilesRepository'),
  IMessagesRepository: Symbol.for('IMessagesRepository'),
  ILegalsRepository: Symbol.for('ILegalsRepository'),
  IPageViewRepository: Symbol.for('IPageViewRepository'),
  IPageViewService: Symbol.for('IPageViewService'),
};

export interface DI_RETURN_TYPES {
  IProjectsRepository: IProjectsRepository;
  IBlogsRepository: IBlogsRepository;
  IProfilesRepository: IProfilesRepository;
  IMessagesRepository: IMessagesRepository;
  ILegalsRepository: ILegalsRepository;
  IPageViewRepository: IPageViewRepository;
  IPageViewService: IPageViewService;
}
