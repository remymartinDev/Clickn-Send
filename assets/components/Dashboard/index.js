import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonCreate from '~/components/ButtonCreate';

import './dashboard.scss';

const Dashboard = ({ userConnected: { username } }) => (
  <div className="contain-dash">
    <h1 className="titre"> Bienvenue {username} </h1>
    <div className="dash-links">
      <ButtonCreate type="facture" />
      <ButtonCreate type="produit" />
      <ButtonCreate type="client" />
    </div>
  </div>
);

Dashboard.propTypes = {
  userConnected: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userConnected: state.notreReducer.userConnected ? state.notreReducer.userConnected : {},
});

export default connect(
  mapStateToProps,
  null,
)(Dashboard);
