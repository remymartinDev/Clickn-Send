import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import logo from '~/images/click-n-send_logo.png';

const Home = () => (
  <Container>
    <img src={logo} alt="logo" />
    <Link to="/dashboard" href="/dashboard">
      <button>entrer</button>
    </Link>
  </Container>
);

export default Home;
