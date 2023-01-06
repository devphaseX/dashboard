import { UnhandledException, UnhandledRejection } from '../../util/error';

function handleServerError(
  rej: (error: UnhandledException | UnhandledRejection) => void
) {
  process.addListener('uncaughtException', (error) =>
    rej(
      new UnhandledException(`Caught an exception which is'nt handled.`, error)
    )
  );
  process.addListener('unhandledRejection', (error) =>
    rej(
      new UnhandledRejection(
        'Caught a promise whose error case is properly handled',
        error
      )
    )
  );
}

export { handleServerError };
