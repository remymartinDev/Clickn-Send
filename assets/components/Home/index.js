import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openModalHome } from '~/store/reducers/localActionCreator';
import logo from '~/images/click-n-send_logo.png';
import ModalHome from './ModalHome';
import './home.scss';

const Home = ({ openModalHome }) => (
  <Container className="home" fluid>
    <div className="home-link">
      <Link to="/dashboard" href="/dashboard">
        <img src={logo} alt="logo" className="home-logo" />
      </Link>
      <div className="home-in">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <button className="home-button" onClick={openModalHome}>Créer un compte</button>
      </div>
    </div>
    <ModalHome />
  </Container>
);
Home.propTypes = {
  openModalHome: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ openModalHome }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
