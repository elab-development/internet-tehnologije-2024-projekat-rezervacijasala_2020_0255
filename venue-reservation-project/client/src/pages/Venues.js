import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Services1 from '../assets/services-1.jpg';
import Services2 from '../assets/services-2.jpg';
import Services3 from '../assets/services-3.jpg';
import Services4 from '../assets/services-4.jpg';
import VenuesReservation from '../components/VenuesReservation';
import AddVenue from '../components/AddVenue';
import VenuesList from '../components/VenuesList';

const Venues = () => {
  const [venues, setVenues] = useState(null);
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const getVenues = async () => {
      const res = await axios.get('http://localhost:8000/api/venues');
      setVenues(res.data);
    };

    getVenues();
  }, [flag]);

  return (
    <section className='services' id='services'>
      <h1 className='heading'>
        {!isAdmin ? 'Book a Venue now!' : 'Our Venues'}
      </h1>

      <div className='box-container'>
        <div className='box'>
          <img src={Services1} alt='services1' />
          <div className='content'>
            <h3>Wedding Halls</h3>
          </div>
        </div>

        <div className='box'>
          <img src={Services2} alt='services2' />
          <div className='content'>
            <h3>Banquet Halls</h3>
          </div>
        </div>

        <div className='box'>
          <img src={Services3} alt='services3' />
          <div className='content'>
            <h3>Celebrations</h3>
          </div>
        </div>

        <div className='box'>
          <img src={Services4} alt='services4' />
          <div className='content'>
            <h3>Unique locations</h3>
          </div>
        </div>
      </div>

      {!isAdmin ? (
        <VenuesReservation venues={venues} />
      ) : (
        <div>
          <VenuesList venues={venues} />
          <h2 className='heading'>Add new Venue</h2>

          <AddVenue flag={flag} setFlag={setFlag} />
        </div>
      )}
    </section>
  );
};

export default Venues;
