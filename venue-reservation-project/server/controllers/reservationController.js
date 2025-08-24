import Reservation from '../models/Reservation.model.js';
import { Types } from 'mongoose';

// POST /api/reservations
export const createReservation = async (req, res) => {
  try {
    const { user, venue, date, slot } = req.body;

    const newReservation = new Reservation({
      date: date,
      slot: slot,
      user: user,
      venue: venue,
    });

    newReservation
      .save()
      .then((result) => {
        res.status(201).send({
          message: 'Reservation created successfully!',
          reservation: result,
        });
      })
      .catch((error) => {
        res.status(500).send({
          error:
            'Something went wrong while creating the reservation: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createReservation: ' + error,
    });
  }
};

// GET /api/reservations
export const getReservations = async (req, res) => {
  try {
    const { venue, user } = req.query;

    if (venue && user) {
      const reservations = await Reservation.find({
        venue: Types.ObjectId(venue),
        user: Types.ObjectId(user),
      })
        .populate('user')
        .populate('venue')
        .exec();

      return res.status(200).send(reservations);
    } else if (venue) {
      const reservations = await Reservation.find({
        venue: Types.ObjectId(venue),
      })
        .populate('user')
        .populate('venue')
        .exec();

      return res.status(200).send(reservations);
    } else if (user) {
      const reservations = await Reservation.find({
        user: Types.ObjectId(user),
      })
        .populate('user')
        .populate('venue')
        .exec();

      return res.status(200).send(reservations);
    } else {
      const reservations = await Reservation.find()
        .populate('user')
        .populate('venue')
        .exec();

      return res.status(200).send(reservations);
    }
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getReservations: ' + error,
    });
  }
};

// GET /api/reservations/:id
export const getReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findOne({ _id: id })
      .populate('user')
      .populate('venue')
      .exec();

    if (!reservation) {
      return res.status(404).send({
        error: 'No reservation found',
      });
    }

    return res.status(200).send(reservation);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getReservation: ' + error,
    });
  }
};

// PUT /api/reservations/:id
export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    Reservation.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Reservation information updated',
        reservation: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong updateReservation: ' + error,
    });
  }
};

// DELETE /api/reservations/:id
export const deleteReservation = async (req, res) => {
  try {
    await Reservation.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Reservation deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong deleteReservation: ' + error,
    });
  }
};
