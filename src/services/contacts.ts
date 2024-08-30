import { ContactsCollection } from '../db/models/contacts.js';
import { IContact } from '../utils/types/contacts/contactsTypes.js';

export const getAllContacts = async (): Promise<IContact[]> => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (
  contactId: string,
): Promise<IContact | null> => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (
  payload: Omit<IContact, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<IContact> => {
  const newContact = await ContactsCollection.create(payload);
  return newContact;
};

export const removeContact = async (
  contactId: string,
): Promise<IContact | null> => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

export const updateContact = async (
  contactId: string,
  payload: Partial<Omit<IContact, '_id' | 'createdAt' | 'updatedAt'>>,
): Promise<IContact | null> => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: false, includeResultMetadata: false },
  );

  if (!contact) return null;

  return contact;
};
