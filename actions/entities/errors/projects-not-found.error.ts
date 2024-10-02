import { BaseError } from './types';

export class ProjectsNotFoundError extends Error {
  constructor(data: BaseError = {}) {
    super(JSON.stringify(data));
    this.name = 'ProjectsNotFoundError';
  }
}