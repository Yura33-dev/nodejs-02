import { Router } from 'express';
import contactsRoute from './contacts.js';
import usersRoute from './auth.js';

const router = Router();

router.use('/contacts', contactsRoute);
router.use('/auth', usersRoute);

export default router;
