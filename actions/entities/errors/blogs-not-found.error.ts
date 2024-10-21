import { BaseError } from './types';

export class BlogsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'BlogsNotFoundError';
  }
}
