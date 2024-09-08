import { Request, Response } from 'express';
import { loginUser, logoutUser, registerUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

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

export const loginUserController = async (
  request: Request,
  response: Response,
) => {
  const session = await loginUser(request.body);

  response.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  response.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  response.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (
  request: Request,
  response: Response,
) => {
  if (request.cookies.sessionId) {
    await logoutUser(request.cookies.sessionId);
  }

  response.clearCookie('sessionId');
  response.clearCookie('refreshToken');

  response.status(204).send();
};
