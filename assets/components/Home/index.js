import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import logo from '~/images/click-n-send_logo.png';
import './home.scss';

const Home = () => (
  <Container className="home" fluid>
    <Link to="/dashboard" href="/dashboard" className="home-link">
      <img src={logo} alt="logo" className="home-logo" />
    </Link>
    <div>
      <Link to="/login">
        <button className="home-button">Login</button>
      </Link>
      <Link to="/signin">
        <button className="home-button">Créer un compte</button>
      </Link>
    </div>
  </Container>
);

export default Home;
