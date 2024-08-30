import { HttpError } from 'http-errors';
export const errorHandler = (error, request, response, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (error instanceof HttpError) {
        response.status(error.status).json({
            status: error.status,
            data: error,
        });
        return;
    }
    response.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: error.message,
    });
};
