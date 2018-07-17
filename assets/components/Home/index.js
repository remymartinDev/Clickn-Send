import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import { openModalHome } from '~/store/reducers/localActionCreator';
import logo from '~/images/click-n-send_logo.png';
import ModalHome from './ModalHome';
import './home.scss';

const Home = ({ openModalHome: open }) => (
  <Container className="home" fluid>
    <div className="home-link">
      <Link to="/dashboard" href="/dashboard">
        <img src={logo} alt="logo" className="home-logo" />
      </Link>
      <div className="home-in">
        <button className="home-button" onClick={open('login')}>Login</button>
        <button className="home-button" onClick={open('signup')}>Créer un compte</button>
      </div>
    </div>
    <ModalHome />
  </Container>
);
Home.propTypes = {
  openModalHome: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  openModalHome: view => () => {
    console.log(view);
    dispatch(openModalHome(view));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
