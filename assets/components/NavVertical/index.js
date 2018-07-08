import React from 'react';
import { Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import User from 'react-icons/lib/fa/user';
import Question from 'react-icons/lib/fa/question-circle';

import logo from '~/images/click-n-send_logo.png';
import './navVertical.scss';

const NavVertical = () => (
  <React.Fragment>
    <header className="navVHead">
      <div className="companyName navVHead-item">Nom de l'entreprise</div>
      <Link to="/profile" href="/profile">
        <User className="user navVHead-item" />
      </Link>
      <Link to="/contact" href="/contact">
        <Question className="question navVHead-item" />
      </Link>
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
            <DropdownItem tag={Link} to="/clients/create">Ajouter client</DropdownItem>
            <DropdownItem tag={Link} to="/clients">Mes clients</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </div>
  </React.Fragment>
);

export default NavVertical;

