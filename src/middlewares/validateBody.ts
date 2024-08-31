import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import createHttpError from 'http-errors';
import { IContact } from '../utils/types/contacts/contactsTypes';

export const validateBody =
  (
    schema: Joi.ObjectSchema<Omit<IContact, '_id' | 'createdAt' | 'updateAt'>>,
  ) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(request.body, { abortEarly: false });
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        const error = createHttpError(400, 'Bad Request', {
          errors: err.details,
        });
        next(error);
      }
    }
  };
