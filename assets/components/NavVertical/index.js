import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import User from 'react-icons/lib/fa/user';
import Question from 'react-icons/lib/fa/question-circle';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import logo from '~/images/click-n-send_logo.png';
import { loggedOut } from '~/store/reducers/localActionCreator';
import './navVertical.scss';

const NavVertical = ({ userConnected, loggedOut: clickLogOut }) => (
  <React.Fragment>
    <header className="navVHead">
      <div className="companyName navVHead-item">
        {userConnected ? userConnected.company.companyName : 'Nom de l\'entreprise'}
      </div>
      <Link to="/profile" href="/profile">
        <User className="user navVHead-item" />
      </Link>
      <Link to="/contact" href="/contact">
        <Question className="question navVHead-item" />
      </Link>
      <button onClick={clickLogOut} className="signout navVHead-item">
        <FontAwesomeIcon className="signout navVHead-item" icon={faSignOutAlt} />
      </button>
    </header>
    <div className="navV-contain">
      <Link to="/dashboard" href="/dashboard">
        <img src={logo} alt="logo" className="NavV-logo" />
      </Link>
      <Nav vertical className="no-wrap">
        <NavLink tag={Link} to="/dashboard" className="navVLink">Accueil</NavLink>
        <UncontrolledDropdown
          direction="right"
        >
          <DropdownToggle className="navVLink dropdownBtn" active={false}>
            Factures
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to="/invoices/create">Créer une facture</DropdownItem>
            <DropdownItem tag={Link} to="/invoices">Mes factures</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          direction="right"
        >
          <DropdownToggle className="navVLink dropdownBtn">
            Produits
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to="/products/create">Créer un produit</DropdownItem>
            <DropdownItem tag={Link} to="/products">Mes produits</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          direction="right"
        >
          <DropdownToggle className="navVLink dropdownBtn">
            Clients
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to="/customers/create">Ajouter client</DropdownItem>
            <DropdownItem tag={Link} to="/customers">Mes clients</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </div>
  </React.Fragment>
);

NavVertical.propTypes = {
  userConnected: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  loggedOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userConnected: state.notreReducer.userConnected,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loggedOut }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavVertical);

