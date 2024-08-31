import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllContactsController = async (
  request: Request,
  response: Response,
) => {
  const { page, perPage } = parsePaginationParams(request.query);

  const contacts = await getAllContacts({ page, perPage });

  response.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    ...contacts,
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

export const createContactController = async (
  request: Request,
  response: Response,
) => {
  const contact = await createContact(request.body);

  response.status(201).json({
    status: 201,
    message: 'Contact has been added',
    data: contact,
  });
};

export const removeContactController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { contactId } = request.params;

  const contact = await removeContact(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact did not find'));
  }

  response.status(204).send();
};

export const updateContactController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { contactId } = request.params;

  const contact = await updateContact(contactId, request.body);

  if (!contact) {
    return next(createHttpError(404, 'Contact did not find'));
  }

  response.status(200).json({
    status: 200,
    message: 'Contact has been updated',
    data: contact,
  });
};
