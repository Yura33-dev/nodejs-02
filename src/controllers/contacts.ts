import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { AuthenticatedRequest } from '../utils/types/AuthenticatedRequest.js';

export const getAllContactsController = async (
  request: AuthenticatedRequest,
  response: Response,
) => {
  const { page, perPage } = parsePaginationParams(request.query);
  const { sortBy, sortOrder } = parseSortParams(request.query);
  const { isFavourite, type } = parseFilterParams(request.query);

  const data = await getAllContacts(
    {
      page,
      perPage,
      sortBy,
      sortOrder,
      isFavourite,
      type,
    },
    request.user,
  );

  response.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (
  request: AuthenticatedRequest,
  response: Response,
) => {
  const { contactId } = request.params;
  const contact = await getContactById(contactId, request.user);

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
  request: AuthenticatedRequest,
  response: Response,
) => {
  const contact = await createContact(request.body, request.user);

  response.status(201).json({
    status: 201,
    message: 'Contact has been added',
    data: contact,
  });
};

export const removeContactController = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) => {
  const { contactId } = request.params;

  const contact = await removeContact(contactId, request.user);

  if (!contact) {
    return next(createHttpError(404, 'Contact did not find'));
  }

  response.status(204).send();
};

export const updateContactController = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) => {
  const { contactId } = request.params;

  const contact = await updateContact(contactId, request.body, request.user);

  if (!contact) {
    return next(createHttpError(404, 'Contact did not find'));
  }

  response.status(200).json({
    status: 200,
    message: 'Contact has been updated',
    data: contact,
  });
};
