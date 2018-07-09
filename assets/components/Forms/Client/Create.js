import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './formClient.scss';

/* eslint-disable */
let CreateClient = props => {
  const { handleSubmit } = props
  return (
    <form className="form form-client" onSubmit={handleSubmit}>
      <h1 className="form-title">Création d'un client</h1>
      <label className="form-label" htmlFor="vatNumber">Numéro de TVA</label>
      <div className="form-with-icon">
        <Field className="form-field" name="vatNumber" component="input" type="text" /> 
        <FontAwesomeIcon className="form-icon" icon={faSearch} />        
      </div>
      <label className="form-label" htmlFor="customerCompany">Nom de l'entreprise</label>
      <Field className="form-field" name="customerCompany" component="input" type="text" />
      <label className="form-label" htmlFor="lastname">Nom</label>
      <Field className="form-field" name="lastname" component="input" type="text" />
      <label className="form-label" htmlFor="firstname">Prénom</label>
      <Field className="form-field" name="firstname" component="input" type="text" />
      <label className="form-label" htmlFor="companyAdress">Adresse</label>
      <Field className="form-field" name="companyAdress" component="input" type="text" />
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
      <label className="form-label" htmlFor="comment">Commentaire</label>
      <Field className="form-field" name="comment" component="input" type="text" />
      <label className="form-label" htmlFor="remise">Remise</label>
      <Field className="form-field" name="remise" component="input" type="text" />
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

CreateClient = reduxForm({
  // a unique name for the form
  form: 'client',
})(CreateClient);

export default CreateClient;