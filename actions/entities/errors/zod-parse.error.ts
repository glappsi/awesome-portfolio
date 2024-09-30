import { BaseError } from './types';

export class ZodParseError extends Error {
  constructor(typeName: string, data: BaseError = {}) {
    super(JSON.stringify({
      ...data,
      typeName
    }));
    this.name = `ZodParseError${typeName}`;
  }
}