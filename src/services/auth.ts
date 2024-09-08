import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/users.js';
import { IUser } from '../utils/types/users/usersTypes.js';
import createHttpError from 'http-errors';

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
