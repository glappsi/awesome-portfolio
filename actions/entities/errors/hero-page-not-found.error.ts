import { BaseError } from './types';

export class HeroPageNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'HeroPageNotFoundError';
  }
}