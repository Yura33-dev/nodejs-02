import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import createHttpError from 'http-errors';
import { SWAGGER_PATH } from '../constants/index.js';
import { NextFunction, Request, Response } from 'express';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return (req: Request, res: Response, next: NextFunction) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
