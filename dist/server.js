import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
export const initServer = () => {
    const app = express();
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.get('/', (request, response) => {
        response.json({ message: 'Hello world!' });
    });
    app.use(router);
    app.use('*', notFoundHandler);
    app.use(errorHandler);
    const PORT = Number(env('PORT', '3000'));
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`);
    });
};
