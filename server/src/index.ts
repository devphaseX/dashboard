import { createConfig, createServerApp } from './server';
import { getEnvVariable } from './server/config/env';
import { handleServerError } from './server/config/error';

(async () => {
  const env = getEnvVariable();
  const { db } = await createConfig({ env });
  const app = createServerApp({ env });

  const PORT = +(env.PORT ?? 5003);

  try {
    await new Promise((res) => app.listen(PORT, () => res(true)));
    console.log('server listing on port: ', PORT);
    await handleServerError();
  } catch (e) {
    await db.disconnect();
    console.log('Something went wrong while setting up the server.\n', e);
  }
})();
