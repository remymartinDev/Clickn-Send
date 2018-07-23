import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './viewProfile.scss';

const ViewDiv = ({ children, style }) => (
  <div className="view-div" style={style}>
    {children}
  </div>
);

const ViewProfile = ({ userConnected }) => {
  console.log(userConnected);
  return (
    <div className="view-profile view">
      <h1 className="view-title">Profile de l'entreprise</h1>
      <Link to="/profile/edit" className="view-link">
        <FontAwesomeIcon className="view-link-icon" icon={faPencilAlt} />
          Editer
      </Link>
      <ViewDiv>Nom de l'entreprise</ViewDiv>
      <ViewDiv>{userConnected.company.companyName}</ViewDiv>
      <ViewDiv>Numéro de TVA</ViewDiv>
      <ViewDiv>{userConnected.company.vatNumber}</ViewDiv>
      <ViewDiv>Adresse</ViewDiv>
      <ViewDiv>{userConnected.company.companyAdress}</ViewDiv>
      <ViewDiv>Code postal</ViewDiv>
      <ViewDiv>{userConnected.company.zipCode}</ViewDiv>
      <ViewDiv>Ville</ViewDiv>
      <ViewDiv>{userConnected.company.city}</ViewDiv>
      <ViewDiv>E-mail</ViewDiv>
      <ViewDiv style={{ wordBreak: 'break-all' }}>{userConnected.company.email}</ViewDiv>
      <ViewDiv>Téléphone</ViewDiv>
      <ViewDiv>{userConnected.company.phone}</ViewDiv>
      <ViewDiv>Fax</ViewDiv>
      <ViewDiv>{userConnected.company.fax}</ViewDiv>
      <ViewDiv>Banque</ViewDiv>
      <ViewDiv>{userConnected.company.bankDomiciliation}</ViewDiv>
      <ViewDiv>Numéro de compte</ViewDiv>
      <ViewDiv style={{ wordBreak: 'break-all' }}>{userConnected.company.bankIban}</ViewDiv>
      <ViewDiv>BIC</ViewDiv>
      <ViewDiv style={{ wordBreak: 'break-all' }}>{userConnected.company.bankBic}</ViewDiv>
      <ViewDiv>RIB</ViewDiv>
      <ViewDiv style={{ wordBreak: 'break-all' }}>{userConnected.company.bankRib}</ViewDiv>
      <ViewDiv>Délai de paiement des factures</ViewDiv>
      <ViewDiv>{userConnected.company.paymentTerm}</ViewDiv>
      <ViewDiv>Informations complémentaires</ViewDiv>
      <ViewDiv>{userConnected.company.companyInformation}</ViewDiv>
      <ViewDiv>Site Internet</ViewDiv>
      <ViewDiv style={{ wordBreak: 'break-all' }}>{userConnected.company.website}</ViewDiv>
    </div>
  );
};

ViewProfile.propTypes = {
  userConnected: PropTypes.object.isRequired,
};

export default ViewProfile;
