import { IProjectsRepository } from '@/actions/application/repositories/projects.repository.interface';
import { IBlogsRepository } from '../actions/application/repositories/blogs.repository.interface';
import { IProfilesRepository } from '../actions/application/repositories/profiles.repository.interface';
import { IMessagesRepository } from '../actions/application/repositories/messages.repository.interface';

export const DI_TYPES = {
  IProjectsRepository: Symbol.for("IProjectsRepository"),
  IBlogsRepository: Symbol.for("IBlogsRepository"),
  IProfilesRepository: Symbol.for("IProfilesRepository"),
  IMessagesRepository: Symbol.for("IMessagesRepository"),
};

export interface DI_RETURN_TYPES {
  IProjectsRepository: IProjectsRepository,
  IBlogsRepository: IBlogsRepository,
  IProfilesRepository: IProfilesRepository,
  IMessagesRepository: IMessagesRepository,
}
