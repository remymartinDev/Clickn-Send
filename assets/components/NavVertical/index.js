import React from 'react';
import { Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import User from 'react-icons/lib/fa/user';
import Question from 'react-icons/lib/fa/question-circle';

import logo from '~/images/click-n-send_logo.png';
import './navVertical.scss';

class NavVertical extends React.Component {
  state = {
    dropdownOpen: false,
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <header className="navVHead">
          <div className="companyName navVHead-item">Nom de l'entreprise</div>
          <User tag={Link} to="/profile" className="user navVHead-item" />
          <Question tag={Link} to="/contact" className="question navVHead-item" />
        </header>
        <div className="navV-contain">
          <img src={logo} alt="logo" className="NavV-logo" />
          <Nav vertical>
            <NavLink tag={Link} to="/dashboard" className="navVLink">Accueil</NavLink>
            <UncontrolledDropdown
              direction="right"
            >
              <DropdownToggle className="navVLink dropdownBtn">
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
  }
}

export default NavVertical;

