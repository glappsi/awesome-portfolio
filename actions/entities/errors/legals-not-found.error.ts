import { BaseError } from './types';

export class LegalsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'LegalsNotFoundError';
  }
}
