import { NextFunction, Request, Response } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;

export const controllerWrapper = (controller: Controller): Controller => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controller(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};
