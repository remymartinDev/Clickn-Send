import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './viewProfile.scss';

const ViewDiv = ({ children, className }) => (
  <div className={`view-div ${className ? className : ''}`}>
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
      { userConnected.company.logo && <img className="view-logo" src={`/data/logo/${userConnected.company.logo}`} alt="logo" /> }
      
      <ViewDiv className="left">Nom d'utilisateur</ViewDiv>
      <ViewDiv className="right">{userConnected.username}</ViewDiv>
      <ViewDiv className="left">Nom de l'entreprise</ViewDiv>
      <ViewDiv className="right">{userConnected.company.companyName}</ViewDiv>
      <ViewDiv className="left">Numéro de TVA</ViewDiv>
      <ViewDiv className="right">{userConnected.company.vatNumber}</ViewDiv>
      <ViewDiv className="left">Adresse</ViewDiv>
      <ViewDiv className="right">{userConnected.company.companyAdress}</ViewDiv>
      <ViewDiv className="left">Code postal</ViewDiv>
      <ViewDiv className="right">{userConnected.company.zipCode}</ViewDiv>
      <ViewDiv className="left">Ville</ViewDiv>
      <ViewDiv className="right">{userConnected.company.city}</ViewDiv>
      <ViewDiv className="left">E-mail</ViewDiv>
      <ViewDiv className="right">{userConnected.company.email}</ViewDiv>
      <ViewDiv className="left">Téléphone</ViewDiv>
      <ViewDiv className="right">{userConnected.company.phone}</ViewDiv>
      <ViewDiv className="left">Fax</ViewDiv>
      <ViewDiv className="right">{userConnected.company.fax}</ViewDiv>
      <ViewDiv className="left">Banque</ViewDiv>
      <ViewDiv className="right">{userConnected.company.bankDomiciliation}</ViewDiv>
      <ViewDiv className="left">Numéro de compte</ViewDiv>
      <ViewDiv className="right">{userConnected.company.bankIban}</ViewDiv>
      <ViewDiv className="left">BIC</ViewDiv>
      <ViewDiv className="right">{userConnected.company.bankBic}</ViewDiv>
      <ViewDiv className="left">RIB</ViewDiv>
      <ViewDiv className="right">{userConnected.company.bankRib}</ViewDiv>
      <ViewDiv className="left">Délai de paiement des factures</ViewDiv>
      <ViewDiv className="right">{userConnected.company.paymentTerm}</ViewDiv>
      <ViewDiv className="left">Informations complémentaires</ViewDiv>
      <ViewDiv className="right">{userConnected.company.companyInformation}</ViewDiv>
      <ViewDiv className="left">Site Internet</ViewDiv>
      <ViewDiv className="right">{userConnected.company.website}</ViewDiv>
    </div>
  );
};

ViewProfile.propTypes = {
  userConnected: PropTypes.object.isRequired,
};

export default ViewProfile;
