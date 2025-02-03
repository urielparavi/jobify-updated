import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

const router = Router();

// We don't use router.route() since we not going to chain anything
// router.route('/register').post(register);
router.post('/register', validateRegisterInput, register);
router.post('/login', login);

export default router;
