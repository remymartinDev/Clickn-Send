import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './formClient.scss';

/* eslint-disable */
let CreateCustomer = props => {
  const { handleSubmit, searchVat } = props
  return (
    <form className="form form-client" onSubmit={handleSubmit}>
      <h1 className="form-title">Création d'un client</h1>
      <label className="form-label" htmlFor="vatNumber">Numéro de TVA</label>
      <div className="form-with-icon">
        <Field className="form-field" name="vatNumber" component="input" type="text" /> 
        <FontAwesomeIcon className="form-icon" icon={faSearch} onClick={searchVat}/>        
      </div>
      <label className="form-label" htmlFor="customerCompany">Nom de l'entreprise</label>
      <Field className="form-field" name="customerCompany" component="input" type="text" />
      <label className="form-label" htmlFor="lastname">Nom</label>
      <Field className="form-field" name="lastname" component="input" type="text" />
      <label className="form-label" htmlFor="firstname">Prénom</label>
      <Field className="form-field" name="firstname" component="input" type="text" />
      <label className="form-label" htmlFor="companyAdress">Adresse</label>
      <Field className="form-field" name="companyAdress" component="input" type="text" />
      <label className="form-label" htmlFor="zipCode">Code postal</label>
      <Field className="form-field" name="zipCode" component="input" type="text" />
      <label className="form-label" htmlFor="city">Ville</label>
      <Field className="form-field" name="city" component="input" type="text" />
      <label className="form-label" htmlFor="countryCode">Pays</label>
      <Field className="form-field" name="countryCode" component="input" type="text" />
      <label className="form-label" htmlFor="phone">Téléphone</label>
      <Field className="form-field" name="phone" component="input" type="text" />
      <label className="form-label" htmlFor="mobile">Portable</label>
      <Field className="form-field" name="mobile" component="input" type="text" />
      <label className="form-label" htmlFor="fax">Fax</label>
      <Field className="form-field" name="fax" component="input" type="text" />
      <label className="form-label" htmlFor="email">E-mail</label>
      <Field className="form-field" name="email" component="input" type="email" />
      <label className="form-label" htmlFor="remise">Remise</label>
      <Field className="form-field" name="remise" component="input" type="text" />
      <label className="form-label" htmlFor="comment">Commentaire</label>
      <Field className="form-field" name="comment" component="textarea" />
      
      <div className="form-radio">
        <label className="form-label radio">
          <Field name="pro" component="input" type="radio" value="1" />
          Professionnel
        </label>
        <label className="form-label radio">
          <Field name="pro" component="input" type="radio" value="0" />
          Particulier
        </label>
      </div>
      <button className="form-button" type="submit">Créer</button>
    </form>
  )
}

CreateCustomer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  serachVat: PropTypes.func.isRequired,
};

CreateCustomer = reduxForm({
  // a unique name for the form
  form: 'client',
})(CreateCustomer);

const mapStateToProps = state => ({
  searchVat: () => console.log('ok'),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCustomer);
