import { loginUser, logoutUser, refreshUsersSession, registerUser, requestResetToken, resetPassword, } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
export const registerUserController = async (request, response) => {
    const user = await registerUser(request.body);
    response.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};
export const loginUserController = async (request, response) => {
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
export const logoutUserController = async (request, response) => {
    if (request.cookies.sessionId) {
        await logoutUser(request.cookies.sessionId);
    }
    response.clearCookie('sessionId');
    response.clearCookie('refreshToken');
    response.status(204).send();
};
const setupSession = (response, session) => {
    response.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    response.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};
export const refreshUserSessionController = async (request, response) => {
    const session = await refreshUsersSession({
        sessionId: request.cookies.sessionId,
        refreshToken: request.cookies.refreshToken,
    });
    const sessionData = session.toObject();
    setupSession(response, sessionData);
    response.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
export const requestResetEmailController = async (request, response) => {
    await requestResetToken(request.body.email);
    response.json({
        message: 'Reset password email was successfully sent!',
        status: 200,
        data: {},
    });
};
export const resetPasswordController = async (request, response) => {
    await resetPassword(request.body);
    response.json({
        message: 'Password was successfully reset!',
        status: 200,
        data: {},
    });
};
