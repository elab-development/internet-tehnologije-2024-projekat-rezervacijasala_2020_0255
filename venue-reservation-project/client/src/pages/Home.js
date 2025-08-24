import React from 'react';

import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import Recommendations from '../components/Recommendations';
import Events from '../components/Events';

const Home = () => {
  return (
    <div>
      <Hero />
      <Reviews />
      <Recommendations />
      <Events />
    </div>
  );
};

export default Home;
