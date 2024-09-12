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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', controllerWrapper(getAllContactsController));
router.get(
  '/:contactId',
  validateId,
  controllerWrapper(getContactByIdController),
);
router.post(
  '/',
  validateBody(createContactSchema),
  controllerWrapper(createContactController),
);
router.delete(
  '/:contactId',
  validateId,
  controllerWrapper(removeContactController),
);
router.patch(
  '/:contactId',
  validateId,
  validateBody(updateContactSchema),
  controllerWrapper(updateContactController),
);

export default router;
