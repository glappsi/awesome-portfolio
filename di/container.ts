import 'reflect-metadata';
import { Container } from 'inversify';
import { ActionsModule } from './modules/actions.module';
import { DI_RETURN_TYPES, DI_TYPES } from './types';

const ApplicationContainer = new Container({
  defaultScope: 'Singleton',
});

export const initializeContainer = () => {
  ApplicationContainer.load(ActionsModule);
};

export function getInjection<K extends keyof typeof DI_TYPES>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_TYPES[symbol]);
}

export { ApplicationContainer };
