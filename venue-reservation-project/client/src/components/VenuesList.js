import React from 'react';

const VenuesList = ({ venues }) => {
  return (
    <div className='box'>
      <div className='services-list'>
        {venues?.map((venue, idx) => (
          <div key={idx} className={`service-item`}>
            <div className='first-row'>
              <div>
                <p>{venue.name}</p>
              </div>
              <div>
                <p>${venue.price}.00</p>
              </div>
            </div>
            <div className='second-row'>
              <p>{venue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesList;
