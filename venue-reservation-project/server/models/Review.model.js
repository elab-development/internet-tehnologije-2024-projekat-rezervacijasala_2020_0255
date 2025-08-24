import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
