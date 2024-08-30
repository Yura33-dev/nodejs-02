import { ContactsCollection } from '../db/models/contacts.js';
export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};
export const createContact = async (payload) => {
    const newContact = await ContactsCollection.create(payload);
    return newContact;
};
export const removeContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
    return contact;
};
export const updateContact = async (contactId, payload) => {
    const contact = await ContactsCollection.findOneAndUpdate({ _id: contactId }, payload, { new: false, includeResultMetadata: false });
    if (!contact)
        return null;
    return contact;
};
