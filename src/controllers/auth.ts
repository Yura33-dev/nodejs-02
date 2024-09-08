import { Request, Response } from 'express';
import { registerUser } from '../services/auth.js';

export const registerUserController = async (
  request: Request,
  response: Response,
) => {
  const user = await registerUser(request.body);

  response.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
