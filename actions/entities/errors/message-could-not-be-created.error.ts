import { BaseError } from './types';

export class MessageCouldNotBeCreatedError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'MessageCouldNotBeCreatedError';
  }
}
