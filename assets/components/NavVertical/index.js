import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Burger from 'react-icons/lib/io/android-menu';
import favLogo from '~/images/favIcon.png';

import './navVertical.scss';

const NavVertical = () => (
  <div>
    <p>List Based</p>
    <Nav vertical>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Another Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href="#">Disabled Link</NavLink>
      </NavItem>
    </Nav>
    <hr />
    <p>Link based</p>
    <Nav vertical>
      <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
    </Nav>
  </div>
);

export default NavVertical
 
