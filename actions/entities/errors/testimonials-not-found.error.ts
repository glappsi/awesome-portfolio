import { BaseError } from './types';

export class TestimonialsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'TestimonialsNotFoundError';
  }
}
