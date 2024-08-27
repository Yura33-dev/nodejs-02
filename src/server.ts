import express, { Request, Response } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';

export const initServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(express.json());

  const PORT = Number(env('PORT', '3000'));

  app.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Hello world!' });
  });

  app.use('*', (request: Request, response: Response) => {
    response.status(404).json({
      message: 'Not found',
    });
  });

  app.use(
    (error: { message: string }, request: Request, response: Response) => {
      response.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    },
  );

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
  });
};
