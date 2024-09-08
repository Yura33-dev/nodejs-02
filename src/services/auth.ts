import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import { IUser } from '../utils/types/users/usersTypes.js';
import { SessionsCollection } from '../db/models/sessions.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const registerUser = async (
  payload: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>,
) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email already used');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) throw createHttpError(404, 'User not found');

  const isPasswordsEqual = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordsEqual)
    throw createHttpError(401, 'Login or password incorrect ');

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId: string) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
