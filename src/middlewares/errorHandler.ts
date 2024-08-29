import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  error: { message: string } | HttpError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({
      status: error.status,
      data: error,
    });
    return;
  }

  response.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
