import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setLogout } from '../state';

const Navbar = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();

  useEffect(() => {
    let navbar = document.querySelector('.header .navbar');
    let menuBtn = document.querySelector('#menu-btn');
    let closeBtn = document.querySelector('#close-navbar');
    menuBtn.onclick = () => {
      navbar.classList.add('active');
    };
    closeBtn.onclick = () => {
      navbar.classList.remove('active');
    };
    window.onscroll = () => {
      navbar.classList.remove('active');
    };
  }, []);

  return (
    <section className="header">
      <Link to="/" className="logo">
        Lokacije
      </Link>

      <nav className="navbar">
        <div id="close-navbar" className="fas fa-times"></div>
        <Link to="/">Home</Link>

        {isAuth && <Link to="/reservations">Vaše rezervacije</Link>}
        {isAuth && <Link to="/venues">Naše Lokacije</Link>}
        {isAuth ? (
          <Link
            to="/"
            onClick={() => {
              dispatch(setLogout());
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <div id="menu-btn" className="fas fa-bars"></div>
    </section>
  );
};

export default Navbar;
