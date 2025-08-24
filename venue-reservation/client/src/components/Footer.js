import React from 'react';

const Footer = () => {
  return (
    <div>
      <section className='footer'>
        <div className='box-container'>
          <div className='box'>
            <h3> Možete nas naći ovde </h3>
            <p>Nađite nas na ovim mrežama</p>
            <div className='share'>
              <a href='#' rel='noopener noreferrer'>
                <i className='fab fa-facebook-f'></i>
              </a>
              <a href='#' rel='noopener noreferrer'>
                <i className='fab fa-twitter'></i>
              </a>
              <a href='#' rel='noopener noreferrer'>
                <i className='fab fa-instagram'></i>
              </a>
              <a href='#' rel='noopener noreferrer'>
                <i className='fab fa-linkedin'></i>
              </a>
            </div>
          </div>
          <div className='box'>
            <h3>Kontakt info</h3>
            <p>+381 61 712 698</p>
            <a href='#' rel='noreferrer' target='_blank' className='link'>
              venues@gmail.com
            </a>
          </div>
          <div className='box'>
            <h3>Lokacija</h3>
            <p>
              Vojslava Ilića 143 <br />
              Beograd <br />
              Srbija
            </p>
          </div>
        </div>
        <div className='credit'>
          created by <span>MN</span> | all rights reserved!{' '}
        </div>
      </section>
    </div>
  );
};

export default Footer;
