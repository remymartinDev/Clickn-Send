import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Form = ({ handleSubmit }) => (
  <form className="form form-client" onSubmit={handleSubmit}>
    <h1 className="form-title">Modification d'un client</h1>
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
        <Field name="pro" component="input" type="radio" value={true} normalize={value => value === "true" ? true : false} />
        Professionnel
      </label>
      <label className="form-label radio">
        <Field name="pro" component="input" type="radio" value={false} normalize={value => value === "true" ? true : false} />
        Particulier
      </label>
    </div>
    <button className="form-button" type="submit">Modifier</button>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
