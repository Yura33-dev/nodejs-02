export interface ISession {
  _id: string;
  userId: string | undefined;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}
