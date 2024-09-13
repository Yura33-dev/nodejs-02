import { Request, Response } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { ISession } from '../utils/types/sessionType.js';

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

const setupSession = (response: Response, session: ISession) => {
  response.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  response.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (
  request: Request,
  response: Response,
) => {
  const session = await refreshUsersSession({
    sessionId: request.cookies.sessionId,
    refreshToken: request.cookies.refreshToken,
  });

  const sessionData = session.toObject() as unknown as ISession;

  setupSession(response, sessionData);

  response.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (
  request: Request,
  response: Response,
) => {
  await requestResetToken(request.body.email);

  response.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (
  request: Request,
  response: Response,
) => {
  await resetPassword(request.body);

  response.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
