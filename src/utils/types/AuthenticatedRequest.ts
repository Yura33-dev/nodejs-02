import { Request } from 'express';
import { IUser } from './users/usersTypes.js';

export interface AuthenticatedRequest extends Request {
  user: IUser;
}
