import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import logo from '~/images/click-n-send_logo.png';

const Home = () => (
  <Container className="home">
    <Link to="/dashboard" href="/dashboard">
      <img src={logo} alt="logo" className="home-logo" />
    </Link>
    <Link to="/dashboard" href="/dashboard">
      <button>entrer</button>
    </Link>
  </Container>
);

export default Home;
