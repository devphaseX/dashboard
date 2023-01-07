import { getExternalSettlePromise } from '../../util';
import { UnhandledException, UnhandledRejection } from '../../util/error';

function handleServerError() {
  const { promise, reject } = getExternalSettlePromise();
  process.addListener('uncaughtException', (error) =>
    reject(
      new UnhandledException(`Caught an exception which is'nt handled.`, error)
    )
  );
  process.addListener('unhandledRejection', (error) =>
    reject(
      new UnhandledRejection(
        'Caught a promise whose error case is properly handled',
        error
      )
    )
  );
  return promise;
}

export { handleServerError };
