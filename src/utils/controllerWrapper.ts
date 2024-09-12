import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthenticatedRequest } from './types/AuthenticatedRequest.js';

type Controller = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;

export const controllerWrapper = (controller: Controller): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controller(request as AuthenticatedRequest, response, next);
    } catch (error) {
      next(error);
    }
  };
};
