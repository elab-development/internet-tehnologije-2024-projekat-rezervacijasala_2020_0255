import { Router } from 'express';
import * as venueController from '../controllers/venueController.js';

const router = Router();

// POST Endpoints
router.route('/').post(venueController.createVenue);

// GET Endpoints
router.route('/').get(venueController.getVenues);
router.route('/:id').get(venueController.getVenue);

// PUT Endpoints
router.route('/:id').put(venueController.updateVenue);

// DELETE Endpoints
router.route('/:id').delete(venueController.deleteVenue);

export default router;
