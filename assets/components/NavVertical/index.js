import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Burger from 'react-icons/lib/io/android-menu';
import favLogo from '~/images/favIcon.png';

import logo from '~/images/click-n-send_logo.png';
import './navVertical.scss';

const NavVertical = () => (
  <div className="navV-contain">
    <img src={logo} alt="logo" className="NavV-logo" />
    <Nav vertical>
      <NavLink tag={Link} to="/dashboard" className="navVLink">Accueil</NavLink>
      <NavLink tag={Link} to="/invoices" className="navVLink">Factures</NavLink>
      <NavLink tag={Link} to="/products" className="navVLink">Produits</NavLink>
      <NavLink tag={Link} to="/clients" className="navVLink">Clients</NavLink>
    </Nav>
  </div>
);

export default NavVertical
 
