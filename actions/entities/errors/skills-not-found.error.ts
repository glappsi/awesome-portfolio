import { BaseError } from './types';

export class SkillsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'SkillsNotFoundError';
  }
}