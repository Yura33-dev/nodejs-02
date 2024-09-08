import { model, Schema } from 'mongoose';
import { IUser } from '../../utils/types/users/usersTypes';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('users', userSchema);
