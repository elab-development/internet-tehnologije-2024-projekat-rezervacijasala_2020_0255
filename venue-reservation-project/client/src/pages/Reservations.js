import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CSVLink } from 'react-csv';

import ReservationCard from '../components/ReservationCard';
import { upcResHeaders } from '../utils/exportReservations';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [order, setOrder] = useState('asc');

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserReservations = async () => {
      const userRes = await axios.get(
        `http://localhost:8000/api/auth/users?email=${user.email}`
      );
      const userData = userRes.data;

      const responseUserReservations = await axios.get(
        `http://localhost:8000/api/reservations?user=${userData._id}`
      );
      setReservations(responseUserReservations.data);
    };

    if (user.role === 'user' || user.role === 'premium') {
      getUserReservations();
    }
  }, [flag, user.role, user.email]);

  useEffect(() => {
    const getUpcomingReservations = async () => {
      const upcRes = await axios.get(
        `http://localhost:8000/api/reservations/upcoming`
      );
      const upcomingReserv = upcRes.data;
      setUpcomingReservations(upcomingReserv);
    };

    if (user.role === 'admin') {
      getUpcomingReservations();
    }
  }, [flag, user.role]);

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(upcomingReservations?.length / 3); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [upcomingReservations]);

  const reorder = () => {
    let newOrderReservations = [];

    if (order === 'asc') {
      newOrderReservations = upcomingReservations.reverse();
      setUpcomingReservations(newOrderReservations);
      setOrder('desc');
    } else {
      newOrderReservations = upcomingReservations.reverse();
      setUpcomingReservations(newOrderReservations);
      setOrder('asc');
    }
  };

  return (
    <section className='reservations' id='pricing'>
      {(user?.role === 'user' || user?.role === 'premium') && (
        <>
          <h1 className='heading'>Your Reservations</h1>

          <div className='box-container'>
            {reservations?.length === 0 && (
              <>
                <h2 className='heading-3'>
                  You haven't booked any Venues!
                  <br />
                  <span onClick={() => navigate('/venues')}>Book one now!</span>
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
        </>
      )}

      {user.role === 'admin' && (
        <>
          <div className='venues-options'>
            <button className='pagination-box' onClick={reorder}>
              {order === 'desc' ? (
                <i class='fas fa-arrow-up'></i>
              ) : (
                <i class='fas fa-arrow-down'></i>
              )}
            </button>
            <CSVLink
              className='btn'
              data={upcomingReservations}
              headers={upcResHeaders}
              filename={new Date().getTime() + 'upcomingres.csv'}
            >
              Export
            </CSVLink>
          </div>

          <h1 className='heading'>Upcoming Reservations</h1>

          <div className='box-container'>
            {upcomingReservations?.length === 0 && (
              <>
                <h2 className='heading-3'>No upcoming reservations.</h2>
              </>
            )}
            {upcomingReservations
              .slice(currentPage * 3 - 3, currentPage * 3)
              ?.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>
          <div className='pagination'>
            {pagesArray.map((page) => (
              <div
                key={page}
                className={`pagination-box ${page === currentPage && 'active'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Reservations;
