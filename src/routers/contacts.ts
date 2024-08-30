import { Router } from 'express';
import {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  removeContactController,
} from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const router = Router();

router.get('/contacts', controllerWrapper(getAllContactsController));
router.get('/contacts/:contactId', controllerWrapper(getContactByIdController));
router.post('/contacts', controllerWrapper(createContactController));
router.delete(
  '/contacts/:contactId',
  controllerWrapper(removeContactController),
);
router.patch(
  '/contacts/:contactId',
  controllerWrapper(updateContactController),
);

export default router;
