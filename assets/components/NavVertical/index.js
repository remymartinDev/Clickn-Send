import React from 'react';
import { Nav, NavLink, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Link } from 'react-router-dom';
import User from 'react-icons/lib/fa/user';
import Question from 'react-icons/lib/fa/question-circle';



import logo from '~/images/click-n-send_logo.png';
import './navVertical.scss';

class NavVertical extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div>
        <div className="navVHead">
          <div className="companyName navVHead-item">Nom de l'entreprise</div>
          <User tag={Link} to="/profile" className="user navVHead-item" />
          <Question tag={Link} to="/contact" className="question navVHead-item" />
        </div>
        <div className="navV-contain">
          <img src={logo} alt="logo" className="NavV-logo" />
          <Nav vertical>
            <NavLink tag={Link} to="/dashboard" className="navVLink">Accueil</NavLink>
            <ButtonDropdown direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
              <DropdownToggle className="navVLink dropdownBtn" >
                Factures
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/invoices/create">Créer une facture</DropdownItem>
                <DropdownItem tag={Link} to="/invoices">Mes factures</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <NavLink tag={Link} to="/products" className="navVLink">Produits</NavLink>
            <NavLink tag={Link} to="/clients" className="navVLink">Clients</NavLink>
          </Nav>
        </div>
      </div>
    );
  }
}

export default NavVertical
 
