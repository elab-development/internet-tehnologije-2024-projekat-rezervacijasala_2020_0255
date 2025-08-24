import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LeaveReview = ({ flag, setFlag }) => {
  const [userReview, setUserReview] = useState('');
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!userReview) {
        setError('required');
        return;
      }

      const userRes = await axios.get(
        `http://localhost:8000/api/auth/users?email=${user.email}`
      );
      const userData = userRes.data;

      await axios.post('http://localhost:8000/api/reviews', {
        review: userReview,
        user: userData._id,
      });
      setFlag(!flag);
    } catch (error) {
      console.error(error);
      setError('something went wrong');
    }

    setUserReview('');
  };

  return (
    <div className='visit'>
      <div className='row'>
        <form onSubmit={handleSubmit}>
          <div className='inputBox'>
            <input
              type='text'
              placeholder='Review'
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              name='firstName'
            />
            <span className='errorText'>{error && error}</span>
          </div>
          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveReview;
