import express from 'express';
import { mountMiddleware, mountRoutes } from '../../middleware';
import type { AppEnvironmentVariable } from '../config/env';

interface ServerAppOption {
  env: AppEnvironmentVariable;
}

function createServerApp(_option: ServerAppOption) {
  const app = express();
  mountMiddleware(app);
  mountRoutes(app);
  return app;
}

export { createServerApp };
