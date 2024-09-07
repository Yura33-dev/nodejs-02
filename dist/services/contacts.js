import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({ page, perPage, sortOrder, sortBy, isFavourite, type, }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find();
    if (isFavourite) {
        contactsQuery.where('isFavourite').equals(isFavourite);
    }
    if (type && type.length > 0) {
        contactsQuery.where('contactType').in(type);
    }
    const [contactsTotalCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);
    const paginationData = calculatePaginationData(contactsTotalCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
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
