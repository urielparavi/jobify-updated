import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

// We don't use router.route() since we not going to chain anything
// router.route('/register').post(register);
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;
