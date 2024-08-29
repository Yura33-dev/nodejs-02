import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
export const initServer = () => {
    const app = express();
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }));
    app.use(express.json());
    const PORT = Number(env('PORT', '3000'));
    app.get('/', (request, response) => {
        response.json({ message: 'Hello world!' });
    });
    app.get('/contacts', async (request, response) => {
        const contacts = await getAllContacts();
        response.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });
    app.get('/contacts/:contactId', async (request, response) => {
        const { contactId } = request.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            return response
                .status(404)
                .json({ status: 404, message: 'Contact did not find', data: null });
        }
        response
            .status(200)
            .json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    });
    app.use('*', (request, response) => {
        response.status(404).json({
            message: 'Not found',
        });
    });
    app.use((error, request, response) => {
        response.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    });
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`);
    });
};
