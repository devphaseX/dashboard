import type { Express } from 'express';
import * as routePath from '../routes';
import { markPathAsAbsolute } from '../util';

function mountRoutes(app: Express) {
  const {
    clientRoutePath,
    generalRoutePath,
    managementRoutePath,
    salesRoutePath,
  } = routePath;

  app.use(markPathAsAbsolute(clientRoutePath.path), clientRoutePath.app);
  app.use(markPathAsAbsolute(generalRoutePath.path), generalRoutePath.app);
  app.use(
    markPathAsAbsolute(managementRoutePath.path),
    managementRoutePath.app
  );
  app.use(markPathAsAbsolute(salesRoutePath.path), salesRoutePath.app);
}

export { mountRoutes };
