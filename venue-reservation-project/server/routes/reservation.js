import { Router } from 'express';
import * as reservationController from '../controllers/reservationController.js';

const router = Router();

// POST Endpoints
router.route('/').post(reservationController.createReservation);

// GET Endpoints
router.route('/').get(reservationController.getReservations);
router.route('/upcoming').get(reservationController.getUpcomingReservations);
router.route('/:id').get(reservationController.getReservation);

// PUT Endpoints
router.route('/:id').put(reservationController.updateReservation);

// DELETE Endpoints
router.route('/:id').delete(reservationController.deleteReservation);

export default router;
