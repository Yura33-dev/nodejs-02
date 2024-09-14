import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({ page, perPage, sortOrder, sortBy, isFavourite, type }, user) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find();
    contactsQuery.where('userId').equals(user._id);
    if (isFavourite !== 'none') {
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
export const getContactById = async (contactId, user) => {
    const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
    });
    return contact;
};
export const createContact = async (payload, user) => {
    payload.userId = user._id;
    const newContact = await ContactsCollection.create(payload);
    return newContact;
};
export const removeContact = async (contactId, user) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
        userId: user._id,
    });
    return contact;
};
export const updateContact = async (contactId, payload, user) => {
    const contact = await ContactsCollection.findOneAndUpdate({ _id: contactId, userId: user._id }, payload, {
        new: true,
        includeResultMetadata: false,
    });
    if (!contact)
        return null;
    return contact;
};
