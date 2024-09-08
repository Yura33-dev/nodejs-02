import { UsersCollection } from '../db/models/users.js';
import { IUser } from '../utils/types/users/usersTypes.js';

export const registerUser = async (
  payload: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>,
) => {
  return await UsersCollection.create(payload);
};
