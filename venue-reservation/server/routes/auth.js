import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/register').post(authController.register);
router
  .route('/authenticate')
  .post(authMiddleware.verifyUser, (req, res) => res.end());
router.route('/login').post(authMiddleware.verifyUser, authController.login);

// GET Endpoints
router.route('/users').get(authController.getUsers);

export default router;
