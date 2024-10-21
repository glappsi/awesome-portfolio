import { BaseError } from './types';

export class FAQsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'FAQsNotFoundError';
  }
}
