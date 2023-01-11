import express from 'express';
import { RoutePath } from '.';
import { getSales } from '../controller/sale';

const route = express.Router();
route.get('/sales', getSales);

const routePath = { path: 'sales', app: route } as const satisfies RoutePath;
export { routePath };
