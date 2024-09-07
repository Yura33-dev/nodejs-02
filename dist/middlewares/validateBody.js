import Joi from 'joi';
import createHttpError from 'http-errors';
export const validateBody = (schema) => async (request, response, next) => {
    try {
        await schema.validateAsync(request.body, { abortEarly: false });
        next();
    }
    catch (err) {
        if (err instanceof Joi.ValidationError) {
            const error = createHttpError(400, 'Bad Request', {
                errors: err.details,
            });
            next(error);
        }
    }
};
