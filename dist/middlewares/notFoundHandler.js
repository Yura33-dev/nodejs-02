import createHttpError from 'http-errors';
export const notFoundHandler = (request, response, next) => {
    return next(createHttpError(404, 'API route not found'));
};
