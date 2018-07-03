import React from 'react';
import { Collapse, Navbar, Nav, NavItem, NavbarToggler } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import Burger from 'react-icons/lib/fa/align-justify';
import favLogo from '~/images/favIcon.png';

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
          <nav className="navbar-brand brand">
            <Link to="/" href="/">
              <img src={favLogo} alt="logo" className="brand-logo" />
            </Link>
            <Link to="/" href="/">
              <span className="brand-name">Click & Send</span>
            </Link>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2 nav-burger">
              <Burger />
            </NavbarToggler>
          </nav>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar className="nav-list">
              <NavItem className="nav-item">
                <NavLink to="/components/dashboard">Accueil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/invoice">Facture</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/products">Produits</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/clients">Clients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/profile">Profile</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
