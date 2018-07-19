import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './clients.scss';

const ViewDiv = ({ children }) => (
  <div className="view-div">
    {children}
  </div>
);

ViewDiv.propTypes = {
  children: PropTypes.any,
};
ViewDiv.defaultProps = {
  children: '',
};

class CustomerView extends React.Component {

  state = {
    customer: {},
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    axios.get(`/api/customer/${id}`)
      .then(({ data: customer }) => {
        this.setState({
          customer,
        });
      });
  }

  render() {
    const { customer } = this.state;
    return (
      <div className="view view-customer">
        <h1 className="view-title">Vue de votre client</h1>
        <Link to={`/customers/${customer.id}/edit`} className="view-link">
          <FontAwesomeIcon className="view-link-icon" icon={faPencilAlt} />
          Editer
        </Link>
        <ViewDiv>Numéro de TVA</ViewDiv>
        <ViewDiv>{customer.vatNumber}</ViewDiv>
        <ViewDiv>Nom de l'entreprise</ViewDiv>
        <ViewDiv>{customer.customerCompany}</ViewDiv>
        <ViewDiv>Nom</ViewDiv>
        <ViewDiv>{customer.lastname}</ViewDiv>
        <ViewDiv>Prénom</ViewDiv>
        <ViewDiv>{customer.firstname}</ViewDiv>
        <ViewDiv>Adresse</ViewDiv>
        <ViewDiv>{customer.companyAdress}</ViewDiv>
        <ViewDiv>Pays</ViewDiv>
        <ViewDiv>{customer.countryCode}</ViewDiv>
        <ViewDiv>Téléphone</ViewDiv>
        <ViewDiv>{customer.phone}</ViewDiv>
        <ViewDiv>Portable</ViewDiv>
        <ViewDiv>{customer.mobile}</ViewDiv>
        <ViewDiv>Fax</ViewDiv>
        <ViewDiv>{customer.fax}</ViewDiv>
        <ViewDiv>E-mail</ViewDiv>
        <ViewDiv>{customer.email}</ViewDiv>
        <ViewDiv>Commentaire</ViewDiv>
        <ViewDiv>{customer.comment}</ViewDiv>
        <ViewDiv>Remise</ViewDiv>
        <ViewDiv>{customer.remise}</ViewDiv>
        <ViewDiv>Statut</ViewDiv>
        <ViewDiv>{customer.pro ? 'Professionel' : 'Particulier'}</ViewDiv>
      </div>
    );
  }
}

CustomerView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CustomerView;
