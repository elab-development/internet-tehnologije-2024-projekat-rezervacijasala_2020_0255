import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Provide first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Provide last name'],
  },
  password: {
    type: String,
    required: [true, 'Provide password'],
  },
  email: {
    type: String,
    required: [true, 'Provide unique email address'],
    unique: [true, 'Email exists'],
  },
  role: {
    type: String,
    default: 'user',
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
