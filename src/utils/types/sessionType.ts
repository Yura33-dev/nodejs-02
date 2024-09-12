import { ObjectId } from 'mongoose';

export interface ISession {
  _id: ObjectId;
  userId: string | undefined;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}
