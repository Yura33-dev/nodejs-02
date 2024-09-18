import { model, Schema } from 'mongoose';
import { IContact } from '../../utils/types/contacts/contactsTypes.js';

const contactsSchema = new Schema<IContact>(
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
      default: null,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    photo: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model<IContact>('contacts', contactsSchema);
