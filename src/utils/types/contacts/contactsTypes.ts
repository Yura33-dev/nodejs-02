export interface IContact {
  _id: string;
  createdAt: Date;
  updateAt: Date;
  name: string;
  phoneNumber: string;
  email?: string | null;
  isFavourite: boolean;
  contactType: 'work' | 'home' | 'personal';
}
