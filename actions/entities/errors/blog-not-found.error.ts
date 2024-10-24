import { BaseError } from './types';

export class BlogNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'BlogNotFoundError';
  }
}
