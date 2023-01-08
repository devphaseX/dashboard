import express from 'express';
import { RoutePath } from '.';
import { getProducts } from '../controller/client';

const route = express.Router();

route.get('/products', getProducts);

const routePath = { path: 'client', app: route } as const satisfies RoutePath;
export { routePath };
