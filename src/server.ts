import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';
import UploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: `error: ${err.statusCode}`,
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error: 500',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server is on!!');
});
