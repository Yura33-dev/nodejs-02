import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  createdAt: Date;
  updateAt: Date;
  name: string;
  email: string | null;
  photo: string | null;
  password: string;
}
