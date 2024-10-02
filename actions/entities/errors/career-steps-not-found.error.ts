import { BaseError } from './types';

export class CareerStepsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'CareerStepsNotFoundError';
  }
}