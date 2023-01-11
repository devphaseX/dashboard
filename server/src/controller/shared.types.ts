type ResponseStatus = 'failed' | 'success';

interface ResponseBase {
  status: ResponseStatus;
}

interface ResponseSuccess<T> extends ResponseBase {
  status: 'success';
  data: T;
}

interface ResponseFailure<T> extends ResponseBase {
  status: 'failed';
  error: unknown;
}

type PlainErrorWithCause<ErrorCause> = {
  message?: string;
  cause?: ErrorCause;
};

export type {
  PlainErrorWithCause,
  ResponseBase,
  ResponseFailure,
  ResponseSuccess,
};
