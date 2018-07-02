import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import logo from '~/images/click-n-send_logo.png';
import './home.scss';

const Home = () => (
  <Container className="home" fluid>
    <Link to="/dashboard" href="/dashboard" className="home-link">
      <img src={logo} alt="logo" className="home-logo" />
      <button className="home-button">entrez</button>
    </Link>
  </Container>
);

export default Home;
