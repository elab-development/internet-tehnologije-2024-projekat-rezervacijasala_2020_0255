import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';

const router = Router();

// POST Endpoints
router.route('/').post(reviewController.createReview);

// GET Endpoints
router.route('/').get(reviewController.getReviews);
router.route('/:id').get(reviewController.getReview);

// PUT Endpoints
router.route('/:id').put(reviewController.updateReview);

// DELETE Endpoints
router.route('/:id').delete(reviewController.deleteReview);

export default router;
