import React, { useEffect, useState } from "react";
import { format, differenceInBusinessDays } from "date-fns";
import { useSelector } from "react-redux";
import axios from "axios";

const ReservationCard = ({ reservation, flag, setFlag }) => {
  const [venue, setVenue] = useState(null);
  const [review, setReview] = useState("");
  const cantCancel =
    differenceInBusinessDays(reservation.date, new Date()) < 10;

  const user = useSelector((state) => state.user);

  const isReservationInPast =
    differenceInBusinessDays(reservation.date, new Date()) <= 0;

  useEffect(() => {
    const getVenue = async () => {
      const responseVenue = await axios.get(
        `http://localhost:8000/api/venues/${reservation.venue._id}`
      );
      setVenue(responseVenue.data);
    };

    getVenue();
  }, [reservation.venue]);

  const handleCancel = async () => {
    await axios.delete(
      `http://localhost:8000/api/reservations/${reservation._id}`
    );
    setFlag(!flag);
  };

  const submitReview = async () => {
    await axios.post(`http://localhost:8000/api/review/`, {
      venue: venue._id,
      user: user.email,
      text: review,
    });
  };

  return (
    <div className="box">
      <h3 className="title">{venue?.name}</h3>
      <div className="price">
        <span className="currency">$</span>
        <span className="amount">{venue?.price}</span>
      </div>
      <ul>
        <li>
          <i className="fas fa-calendar"></i>
          {format(reservation?.date, "dd.MM.yyyy")} {reservation?.slot}
        </li>
      </ul>

      {!isReservationInPast && (
        <button
          type="button"
          className="cancel-button"
          disabled={cantCancel}
          onClick={handleCancel}
        >
          Otkaži
        </button>
      )}

      {isReservationInPast && (
        <div className="review review__input">
          <textarea
            value={review}
            rows={3}
            className="review__textbox"
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={submitReview} className="review__button">
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
