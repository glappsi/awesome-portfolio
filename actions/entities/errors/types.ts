export type BaseError = {
  traceId?: string;
  originalError?: unknown;
  data?: unknown;
};
