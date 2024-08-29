import { Request, Response } from 'express';

export const notFoundHandler = (request: Request, response: Response) => {
  response.status(404).json({
    message: 'API route not found',
  });
};
