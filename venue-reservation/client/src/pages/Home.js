import React from 'react';

import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import Recommendations from '../components/Recommendations';

const Home = () => {
  return (
    <div>
      <Hero />
      <Reviews />
      <Recommendations />
    </div>
  );
};

export default Home;
