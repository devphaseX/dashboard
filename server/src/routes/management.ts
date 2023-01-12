import express from 'express';
import { RoutePath } from '.';
import { getAdmin } from '../controller/management';
const route = express.Router();

route.get('/admin', getAdmin);

const routePath = {
  path: 'management',
  app: route,
} as const satisfies RoutePath;
export { routePath };
