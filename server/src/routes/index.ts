import { Router } from 'express';

interface RoutePath {
  path: string;
  app: Router;
}

export type { RoutePath };
export { routePath as clientRoutePath } from './client';
export { routePath as generalRoutePath } from './general';
export { routePath as managementRoutePath } from './management';
export { routePath as salesRoutePath } from './sales';
