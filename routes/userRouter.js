import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
// [] => In express we can group together multiple middlewares just by adding square brackets
router.get('/admin/app-stats', [
  authorizePermissions('admin', 'user'),
  getApplicationStats,
]);
router.patch(
  '/update-user',
  checkForTestUser,
  // avatar => the name that we choosed from our formData, so the name attribute
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);

export default router;
