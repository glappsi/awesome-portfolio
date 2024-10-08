import { BaseError } from './types';

export class LegalNotFoundError extends Error {
  constructor(type: string, data: BaseError = {}) {
    super(JSON.stringify({
      ...data,
      type
    }));
    this.name = 'LegalsNotFoundError';
  }
}