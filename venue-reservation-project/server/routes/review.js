import { Router } from "express";
// import * as reservationController from '../controllers/reservationController.js';
import * as reviewController from "../controllers/reviewController.js";

const router = Router();

// POST Endpoints
router.route("/").post(reviewController.createReview);

// GET Endpoints
router.route("/:venueId").get(reviewController.getReviewByVenueId);

export default router;
