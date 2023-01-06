import express, { type Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

function mountMiddleware(app: Express) {
  /* Configuration */

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(morgan('common'));
  app.use(helmet());
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors());
}

export { mountMiddleware };
