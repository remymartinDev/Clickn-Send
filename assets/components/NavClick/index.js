import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import favLogo from '~/images/favicon.png';

import './navLink.scss';

export default class NavClick extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div>
        <Navbar className="dashboard-nav" color="faded" dark>
          <NavbarBrand href="/" className=" brand">
            <img src={favLogo} alt="logo" className="brand-logo" />
            <span className="brand-name">Click & Send</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2 nav-burger" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar className="nav-list">
              <NavItem>
                <NavLink to="/components/Dashboard">Accueil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/Invoice">Facture</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/Products">Produits</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/Clients">Clients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/Profile">Profile</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
