import express from 'express';
import { RoutePath } from '.';
import { getUser } from '../controller/general';

const route = express.Router();

route.get('/user/:id', getUser);
const routePath = { path: 'general', app: route } as const satisfies RoutePath;
export { routePath };
