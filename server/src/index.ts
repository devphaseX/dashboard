import { createConfig, createServerApp } from './server';
import { getEnvVariable } from './server/config/env';

(async () => {
  const env = getEnvVariable();
  const config = await createConfig({ env });
  const app = createServerApp({ env });
})();
