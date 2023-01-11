import { PlainErrorWithCause } from '../controller/shared.types';
import { getEnvVariable } from '../server/config/env/index';

class UnhandledRejection extends Error {
  readonly type: 'unhandledRejection' = 'unhandledRejection';
  reason?: unknown;
  constructor(msg: string, reason?: unknown) {
    super(`[error]: ${msg}`);
    this.reason = reason;
  }
}
class UnhandledException extends Error {
  readonly type: 'unhandledException' = 'unhandledException';
  reason?: unknown;
  constructor(msg: string, reason?: unknown) {
    super(`[error]: ${msg}`);
    this.reason = reason;
  }
}

const resolveError = (error: unknown) =>
  typeof error === 'object' && Object(error) === error
    ? (error as { message?: string }).message ?? error
    : error;

const prepareError = <ErrorCause>(
  e: unknown,
  cause?: ErrorCause
): PlainErrorWithCause<ErrorCause> => ({
  message: resolveError(e),
  ...(getEnvVariable().NODE_ENV === 'development' ? { cause } : null),
});

export { UnhandledException, UnhandledRejection, resolveError, prepareError };
