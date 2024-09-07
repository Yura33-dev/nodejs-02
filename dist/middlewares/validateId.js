import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
export const validateId = (request, response, next) => {
    const { contactId } = request.params;
    if (!isValidObjectId(contactId)) {
        throw createHttpError(400, 'Bad Request');
    }
    next();
};
