import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const router = Router();

router.get('/contacts', controllerWrapper(getAllContactsController));
router.get('/contacts/:contactId', controllerWrapper(getContactByIdController));

export default router;
