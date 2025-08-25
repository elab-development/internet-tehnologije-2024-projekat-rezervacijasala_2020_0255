import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Provide review'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
