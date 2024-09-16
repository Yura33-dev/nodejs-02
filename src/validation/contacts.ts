import Joi from 'joi';
import { IContact } from '../utils/types/contacts/contactsTypes';

export const createContactSchema = Joi.object<
  Omit<IContact, '_id' | 'createdAt' | 'updateAt'>
>({
  name: Joi.string().min(2).max(16).required().messages({
    'string.base': 'Name should be a string type',
    'string.min': 'Name should have at least 2 symbols ',
    'string.max': 'Name should have max 16 symbols',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.string().min(6).max(11).required().messages({
    'string.base': 'Phone should be a string type',
    'string.min': 'Phone should have at least 6 symbols ',
    'string.max': 'Phone should have max 11 symbols',
    'any.required': 'Phone is a required field',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Email should be a string type',
      'string.email': 'Email is invalid',
    }),
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'Favourite should be a boolean type',
    'any.required': 'Favourite is a required field',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'ContactType field should be a string type',
      'any.only': 'ContactType field should be "work", "home" or "personal"',
      'any.required': 'ContactType is a required field',
    }),
  photo: Joi.string().default(null).messages({
    'string.base': 'Photo should be a string type',
  }),
});

export const updateContactSchema = Joi.object<
  Omit<IContact, '_id' | 'createdAt' | 'updateAt'>
>({
  name: Joi.string().min(2).max(16).messages({
    'string.base': 'Name should be a string type',
    'string.min': 'Name should have at least 2 symbols ',
    'string.max': 'Name should have max 16 symbols',
  }),
  phoneNumber: Joi.string().min(6).max(11).messages({
    'string.base': 'Phone should be a string type',
    'string.min': 'Phone should have at least 6 symbols ',
    'string.max': 'Phone should have max 11 symbols',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Email should be a string type',
      'string.email': 'Email is invalid',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite should be a boolean type',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'ContactType field should be a string type',
    'any.only': 'ContactType field should be "work", "home" or "personal"',
  }),
  photo: Joi.string().default(null).messages({
    'string.base': 'Photo should be a string type',
  }),
});
