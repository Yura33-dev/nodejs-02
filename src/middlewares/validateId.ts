import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateId = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { contactId } = request.params;

  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
