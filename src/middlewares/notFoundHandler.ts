import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return next(createHttpError(404, 'API route not found'));
};
