import React from 'react';
import { Collapse, Navbar, Nav, NavItem, NavbarToggler, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Burger from 'react-icons/lib/io/android-menu';
import favLogo from '~/images/favIcon.png';

import './navLink.scss';

export default class NavClick extends React.Component {
  state = {
    collapsed: true,
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header className="page-header">
        <Navbar className="dashboard-nav" color="faded">
          <nav className="navbar-brand brand">
            <Link to="/dashboard" href="/dashboard">
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
            <Nav navbar className="nav-list" onClick={this.toggleNavbar}>
              <NavItem>
                <NavLink tag={Link} to="/dashboard">Accueil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/invoices">Factures</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/products">Produits</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/clients">Clients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/profile">Profile</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
