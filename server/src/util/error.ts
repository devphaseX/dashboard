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

export { UnhandledException, UnhandledRejection };
