import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import ReservationCard from '../components/ReservationCard';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserReservations = async () => {
      const userRes = await axios.get(
        `http://localhost:8000/api/auth/users?email=${user.email}`
      );
      const userData = userRes.data;
      console.log(userData);

      const responseUserReservations = await axios.get(
        `http://localhost:8000/api/reservations?user=${userData._id}`
      );
      console.log(responseUserReservations);
      setReservations(responseUserReservations.data);
    };

    getUserReservations();
  }, [flag]);

  return (
    <section className='reservations' id='pricing'>
      <h1 className='heading'>Vaše Rezervacije</h1>

      <div className='box-container'>
        {reservations?.length === 0 && (
          <>
            <h2 className='heading-3'>
              Nemate rezervisanu lokaciju!
              <br />
              <span onClick={() => navigate('/venues')}>Rezervišite sada!</span>
            </h2>
          </>
        )}
        {reservations?.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            flag={flag}
            setFlag={setFlag}
          />
        ))}
      </div>
    </section>
  );
};

export default Reservations;
