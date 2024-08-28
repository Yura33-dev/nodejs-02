import { model, Schema } from 'mongoose';

interface IContact {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string | null;
  isFavourite: boolean;
  contactType: 'work' | 'home' | 'personal';
  createdAt: Date;
  updateAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model<IContact>('contacts', contactSchema);
