import { createConfig, createServerApp } from './server';
import { getEnvVariable } from './server/config/env';
import { handleServerError } from './server/config/error';

(async () => {
  const env = getEnvVariable();
  await createConfig({ env });
  const app = createServerApp({ env });

  const PORT = +(env.PORT ?? 5500);
  console.log({ PORT: env.PORT });

  await new Promise((res, rej) => {
    handleServerError(rej);
    app.listen(PORT, () => res(true));
  }).catch((reason) => {
    console.log('Something went wrong while setting up the server.');
    console.log(reason);
  });
  console.log('server listing on port ' + PORT);
})();
