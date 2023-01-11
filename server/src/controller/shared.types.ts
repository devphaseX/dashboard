type ResponseStatus = 'failed' | 'success';

interface ResponseBase {
  status: ResponseStatus;
}

interface ResponseSuccess<T> extends ResponseBase {
  status: 'success';
  data: T;
}

interface ResponseFailure<Cause = unknown> extends ResponseBase {
  status: 'failed';
  error: PlainErrorWithCause<Cause>;
}

type PlainErrorWithCause<ErrorCause> = {
  message?: unknown;
  cause?: ErrorCause;
};

export type {
  PlainErrorWithCause,
  ResponseBase,
  ResponseFailure,
  ResponseSuccess,
};
