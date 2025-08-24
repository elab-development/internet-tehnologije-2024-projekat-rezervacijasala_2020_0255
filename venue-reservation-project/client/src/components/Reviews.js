import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Quote from '../assets/quote-img.png';
import UserImage from '../assets/review.png';
import LeaveReview from './LeaveReview';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [flag, setFlag] = useState(false);
  const userLoggedIn = Boolean(useSelector((state) => state.user));

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/reviews');
        setReviews(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [flag]);

  return (
    <section className='review' id='review'>
      <h1 className='heading'>Customer's Review</h1>

      <div className='box-container'>
        {reviews?.map((review) => (
          <div className='box' key={review._id}>
            <img src={Quote} alt='quote' className='quote' />
            <p>{review?.review}</p>
            <img src={UserImage} alt='reviewer1' />
            <h3>
              {review?.user?.firstName} {review?.user?.lastName}
            </h3>
            <div className='stars'>
              <i className='fas fa-star'></i>
              <i className='fas fa-star'></i>
              <i className='fas fa-star'></i>
              <i className='fas fa-star'></i>
              <i className='fas fa-star-half-alt'></i>
            </div>
          </div>
        ))}
      </div>

      {userLoggedIn && (
        <>
          <h2 className='heading'>Leave your opinion</h2>
          <LeaveReview flag={flag} setFlag={setFlag} />
        </>
      )}
    </section>
  );
};

export default Reviews;
