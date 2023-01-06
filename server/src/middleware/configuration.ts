import express, { type Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

function mountMiddleware(app: Express) {
  /* Configuration */

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser());

  app.use(morgan('common'));
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors());
}

export { mountMiddleware };
