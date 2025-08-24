import React, { useEffect, useState } from 'react';
import { getEvents } from '../utils/eventsApi';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <section className='review' id='review'>
      <h1 className='heading'>Recommended Events in our City</h1>
      {!events && <h3>No events fetched, check you API!</h3>}
      <div className='box-container'>
        {events?.map((event, idx) => (
          <div className='box' key={idx}>
            <h3>{event?.summary}</h3>
            <h4>Location: {event?.location}</h4>
            <h4>Description: {event?.description}</h4>
            <h4>
              <a
                href={event?.url || '#'}
                target='_blank'
                rel='noopener noreferer'
              >
                Check it out
              </a>
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
