import { ObjectId } from 'mongoose';

export interface ISession {
  _id: ObjectId | null | undefined;
  userId: ObjectId | null | undefined;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}
