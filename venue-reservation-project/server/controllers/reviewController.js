import Review from "../models/Review.model.js";
import User from "../models/User.model.js";
import Venue from "../models/Venue.model.js";
import { Types } from "mongoose";

// POST /api/review
export const createReview = async (req, res) => {
  try {
    const { text, user, venue } = req.body;

    const [existingUser, existingVenue] = await Promise.allSettled([
      User.findOne({ email: user }),
      Venue.findOne({ _id: venue }),
    ]);

    if (!existingUser.status === "rejected") {
      return res.status(404).send({
        error: "Invalid user ID.",
      });
    }

    if (!existingVenue.status === "rejceted") {
      return res.status(404).send({
        error: "Invalid venue ID.",
      });
    }

    const review = new Review({
      user: existingUser.value._id,
      venue,
      text,
    });

    const savedReview = await review.save();

    const response = await savedReview.populate({
      path: "user",
      select: "firstName lastName email",
    });

    res.status(201).send({
      message: "Review created successfully!",
      response,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Something went wrong while leaving a review" + error,
    });
  }
};

// GET /api/review/:id
export const getReviewByVenueId = async (req, res) => {
  try {
    const { venueId } = req.params;

    const reviews = await Review.find(
      { venue: Types.ObjectId(venueId) },
      {},
      { populate: [{ path: "user", select: "firstName lastName email" }] }
    );

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({
      error: "Something went wrong getReservation: " + error,
    });
  }
};
