import Venue from '../models/Venue.model.js';

// POST /api/venues
export const createVenue = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const newVenue = new Venue({
      name: name,
      description: description,
      price: price,
    });

    newVenue
      .save()
      .then((result) => {
        res.status(201).send({
          message: 'Venue created successfully!',
          venue: result,
        });
      })
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the venue: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createVenue: ' + error,
    });
  }
};

// GET /api/venues
export const getVenues = async (req, res) => {
  try {
    Venue.find({}, (err, venues) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the venues: ' + err,
        });
      }

      if (!venues) {
        return res.status(404).send({
          error: 'No venues found',
        });
      }

      return res.status(200).send(venues);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getVenues: ' + error,
    });
  }
};

// GET /api/venues/:id
export const getVenue = async (req, res) => {
  try {
    const { id } = req.params;

    Venue.findOne({ _id: id }, (err, venue) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the venue: ' + err,
        });
      }

      if (!venue) {
        return res.status(404).send({
          error: 'No venues found',
        });
      }

      return res.status(200).send(venue);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getVenue: ' + error,
    });
  }
};

// PUT /api/venues/:id
export const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    Venue.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Venue information updated',
        venue: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong updateVenue: ' + error,
    });
  }
};

// DELETE /api/venues/:id
export const deleteVenue = async (req, res) => {
  try {
    await Venue.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Venue deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong deleteVenue: ' + error,
    });
  }
};
