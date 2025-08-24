import mongoose from 'mongoose';

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide venue name'],
    unique: [true, 'Venue exists'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Provide price'],
  },
});

const Venue = mongoose.model('Venue', VenueSchema);
export default Venue;
