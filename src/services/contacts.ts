import { ContactsCollection } from '../db/models/contact.js';
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
