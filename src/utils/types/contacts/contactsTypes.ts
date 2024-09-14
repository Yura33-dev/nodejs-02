import { ObjectId } from 'mongoose';

export interface IContact {
  _id: ObjectId;
  createdAt: Date;
  updateAt: Date;
  name: string;
  phoneNumber: string;
  email?: string | null;
  isFavourite: boolean;
  contactType: 'work' | 'home' | 'personal';
  userId: ObjectId;
  photo: string;
}
