import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Name should be a string type',
    'string.min': 'Name should have at least 2 symbols ',
    'string.max': 'Name should have max 30 symbols',
    'any.required': 'Name is a required field',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Email should be a string type',
      'string.email': 'Email is invalid',
    }),
  password: Joi.string().min(7).max(30).required().messages({
    'string.base': 'Password should be a string type',
    'string.min': 'Password should have at least 7 symbols ',
    'string.max': 'Password should have max 30 symbols',
    'any.required': 'Password is a required field',
  }),
});
