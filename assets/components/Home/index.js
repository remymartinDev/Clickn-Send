import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/images/click-n-send_logo.png';

const Home = () => (
  <div>
    <img src={logo} alt="logo" />
    <Link to="/dashboard" href="/dashboard">
      <button>entrer</button>
    </Link>
  </div>
);

export default Home;
