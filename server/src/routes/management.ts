import express from 'express';
import { RoutePath } from '.';

const route = express.Router();

const routePath = { path: 'management', app: route } satisfies RoutePath;
export { routePath };
