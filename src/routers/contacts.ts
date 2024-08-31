import { Router } from 'express';
import {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  removeContactController,
} from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();

router.get('/contacts', controllerWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  validateId,
  controllerWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  controllerWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  validateId,
  controllerWrapper(removeContactController),
);
router.patch(
  '/contacts/:contactId',
  validateId,
  validateBody(updateContactSchema),
  controllerWrapper(updateContactController),
);

export default router;
