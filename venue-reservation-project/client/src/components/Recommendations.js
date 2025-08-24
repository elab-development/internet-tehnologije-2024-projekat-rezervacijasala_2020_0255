import React, { useEffect, useState } from 'react';

import { getRestaurants } from '../utils/restaurantsApi';

const Recommendations = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const restaurantsData = await getRestaurants();
      setRestaurants(restaurantsData);
    };

    getRecommendations();
  }, []);

  return (
    <section className='review' id='review'>
      <h1 className='heading'>Recommended Restaurants</h1>
      {!restaurants && <h3>No restaurants fetched, check you API!</h3>}
      <div className='box-container'>
        {restaurants?.map((restaurant, idx) => (
          <div className='box' key={idx}>
            <img
              className='hero-img'
              alt='hero'
              src={
                restaurant?.squareImgUrl ||
                'https://www.restoranibeograd.com/storage/news/interior/772/restoran_despacito_5_(1).JPG'
              }
            />
            <h3>{restaurant?.name}</h3>
            <h4>
              <a
                href={restaurant?.menuUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Check out the Menu
              </a>
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
