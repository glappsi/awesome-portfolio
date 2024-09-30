import { ContainerModule, interfaces } from 'inversify';
import { DI_TYPES } from '../types';
import { PayloadPagesRepository } from '@/actions/infrastructure/repositories/payload.pages.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind(DI_TYPES.IPagesRepository).to(PayloadPagesRepository);
};

export const ActionsModule = new ContainerModule(initializeModule);