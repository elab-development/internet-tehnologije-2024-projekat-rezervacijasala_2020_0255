import Review from '../models/Review.model.js';

// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { review, user } = req.body;

    const newReview = new Review({
      review: review,
      user: user,
    });

    newReview
      .save()
      .then((result) => {
        res.status(201).send({
          message: 'Review created successfully!',
          review: result,
        });
      })
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the review: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createReview: ' + error,
    });
  }
};

// GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user')
      .sort([['createdAt', -1]])
      .exec();

    if (!reviews) {
      return res.status(404).send({
        error: 'No reviews found',
      });
    }

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getReviews: ' + error,
    });
  }
};

// GET /api/reviews/:id
export const getReview = async (req, res) => {
  try {
    const { id } = req.params;

    Review.findOne({ _id: id }, (err, review) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the review: ' + err,
        });
      }

      if (!review) {
        return res.status(404).send({
          error: 'No reviews found',
        });
      }

      return res.status(200).send(review);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getReview: ' + error,
    });
  }
};

// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    Review.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Review information updated',
        review: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong updateReview: ' + error,
    });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    await Review.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Review deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong deleteReview: ' + error,
    });
  }
};
