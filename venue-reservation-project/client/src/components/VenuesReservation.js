import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';

import { slots } from '../utils/constants';

const VenuesReservation = ({ venues }) => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [venueSlots, setVenueSlots] = useState(slots);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const isPremiumUser = user?.role === 'premium';
  const navigate = useNavigate();

  useEffect(() => {
    const filterSlots = async () => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      setVenueSlots([]);
      const responseVenueReservations = await axios.get(
        `http://localhost:8000/api/reservations?venue=${selectedVenue?._id}`
      );
      const existingReservations = responseVenueReservations.data;
      let unavailableSlots = [];
      existingReservations.forEach((existingRes) => {
        if (format(existingRes.date, 'yyyy-MM-dd') === formattedDate) {
          unavailableSlots.push(existingRes.slot);
        }
      });

      let newSlots = [];
      slots.forEach((slot) => {
        if (!unavailableSlots.includes(slot.time)) {
          newSlots.push(slot);
        }
      });

      setVenueSlots(newSlots);
      setSelectedSlot(null);
    };

    if (selectedVenue) {
      filterSlots();
    }
  }, [selectedVenue, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = async () => {
    setError(null);
    if (selectedVenue?.name && selectedDate && selectedSlot) {
      try {
        const userRes = await axios.get(
          `http://localhost:8000/api/auth/users?email=${user.email}`
        );
        const userData = userRes.data;

        await axios.post('http://localhost:8000/api/reservations', {
          date: format(selectedDate, 'yyyy-MM-dd'),
          slot: selectedSlot,
          user: userData._id,
          venue: selectedVenue?._id,
        });

        navigate('/reservations');
      } catch (err) {
        console.log(err);
      }
    } else {
      setError('Please select all fields!');
      return;
    }
  };

  return (
    <div className='box-container'>
      <div className='box'>
        <h3 className='heading-3'>Pick a Venue</h3>
        <div className='services-list'>
          {venues?.map((venue, idx) => (
            <div
              key={idx}
              className={`service-item ${
                selectedVenue?.name === venue.name && 'selected-service-item'
              }`}
              onClick={() => setSelectedVenue(venue)}
            >
              <div className='first-row'>
                <div>
                  <p>{venue.name}</p>
                </div>
                <div>
                  {isPremiumUser && <p style={{ textDecoration: 'line-through' }}>${venue.price}.00</p>}
                  <p>${isPremiumUser ? Math.ceil(venue.price / 2) : venue.price}.00</p>
                </div>
              </div>
              <div className='second-row'>
                <p>{venue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='box'>
        <h3 className='heading-3'>Pick a Date</h3>
        <div className='date-picker'>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='dd/MM/yyyy'
            minDate={new Date()}
            disabled={!selectedVenue?.name}
          />
        </div>
      </div>

      <div className='box'>
        {selectedVenue?.name && (
          <>
            <h3 className='heading-3'>Pick available Slot</h3>
            <div className='slots'>
              {venueSlots.map((slot, idx) => (
                <div key={idx}>
                  <button
                    type='button'
                    className={`${
                      selectedSlot === slot.time && 'selected-slot'
                    }`}
                    onClick={() => setSelectedSlot(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </button>
                </div>
              ))}
            </div>

            {selectedSlot && (
              <div className='btn-book'>
                <button onClick={handleBooking} className='btn'>
                  Book a Venue
                </button>
                {error && <p className='errorText'>{error}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VenuesReservation;
