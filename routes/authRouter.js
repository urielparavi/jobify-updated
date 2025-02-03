import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const router = Router();

// We don't use router.route() since we not going to chain anything
// router.route('/register').post(register);
router.post('/register', register);
router.post('/login', login);

export default router;
