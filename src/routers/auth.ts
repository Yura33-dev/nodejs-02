import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController),
);

router.post('/logout', controllerWrapper(logoutUserController));

router.post('/refresh', controllerWrapper(refreshUserSessionController));

export default router;
