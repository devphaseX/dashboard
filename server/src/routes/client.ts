import express from 'express';
import { RoutePath } from '.';
import { getCustomers, getProducts } from '../controller/client';

const route = express.Router();

route.get('/products', getProducts);
route.get('/customers', getCustomers);

const routePath = { path: 'client', app: route } as const satisfies RoutePath;
export { routePath };
