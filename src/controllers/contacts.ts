import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (
  request: Request,
  response: Response,
) => {
  const contacts = await getAllContacts();

  response.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (
  request: Request,
  response: Response,
) => {
  const { contactId } = request.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact did not find');
  }

  response.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
