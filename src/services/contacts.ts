import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { IContact } from '../utils/types/contacts/contactsTypes.js';
import { IPaginationData } from '../utils/types/paginationTypes.js';

export const getAllContacts = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<{ contacts: IContact[] } & IPaginationData> => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  const contactsTotalCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(
    contactsTotalCount,
    perPage,
    page,
  );
  return {
    contacts,
    ...paginationData,
  };
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
