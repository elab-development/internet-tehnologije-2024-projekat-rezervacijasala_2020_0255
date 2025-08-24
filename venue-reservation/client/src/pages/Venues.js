import React from 'react';

import Services1 from '../assets/services-1.avif';
import Services2 from '../assets/services-2.webp';
import Services3 from '../assets/services-3.jpeg';
import Services4 from '../assets/services-4.jpg';
import VenuesReservation from '../components/VenuesReservation';

const Venues = () => {
  return (
    <section className="services" id="services">
      <h1 className="heading">Rezervišite lokaciju sada!</h1>

      <div className="box-container">
        <div className="box">
          <img src={Services1} alt="services1" />
          <div className="content">
            <h3>Sale za venčanja</h3>
          </div>
        </div>

        <div className="box">
          <img src={Services2} alt="services2" />
          <div className="content">
            <h3>Sale za Banket</h3>
          </div>
        </div>

        <div className="box">
          <img src={Services3} alt="services3" />
          <div className="content">
            <h3>Proslave</h3>
          </div>
        </div>

        <div className="box">
          <img src={Services4} alt="services4" />
          <div className="content">
            <h3>Unikatne lokacije</h3>
          </div>
        </div>
      </div>
      <VenuesReservation />
    </section>
  );
};

export default Venues;
