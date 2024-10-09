import { BaseError } from './types';

export class ProfileNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'ProfileNotFoundError';
  }
}
