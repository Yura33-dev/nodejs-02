export interface IContact {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string | null;
  isFavourite: boolean;
  contactType: 'work' | 'home' | 'personal';
  createdAt: Date;
  updateAt: Date;
}
