import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Provide date'],
  },
  slot: {
    type: String,
    required: [true, 'Provide slot'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
  },
  discounted: {
    type: Boolean,
    default: false,
    required: [false]
  },
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation;
