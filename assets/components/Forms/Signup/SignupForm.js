import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import { createCompany } from '~/store/reducers/dataActionCreator';
import InputFile from './InputFile';
import './signupForm.scss';

const SignupForm = (props) => {
  return (
    <form className="form signup-form" onSubmit={props.handleSubmit}>
      <h1 className="form-title">Créer votre compte</h1>
      <label className="form-label" htmlFor="companyName">Nom de l'entreprise *</label>
      <Field className="form-field" name="companyName" component="input" type="text" required />
      <label className="form-label" htmlFor="_username">Votre identifiant *</label>
      <Field className="form-field" name="_username" component="input" type="text" required />
      <label className="form-label" htmlFor="_password">Votre mot de passe *</label>
      <Field className="form-field" name="_password" component="input" type="password" required />
      <label className="form-label" htmlFor="_password2">confirmation de votre mot de passe *</label>
      <Field className="form-field" name="_password2" component="input" type="password" required />
      <div className="separation" />
      <label className="form-label" htmlFor="companyAdress">Adresse de votre entreprise *</label>
      <Field className="form-field" name="companyAdress" component="input" type="text" required />
      <label className="form-label" htmlFor="zipCode">Code postal *</label>
      <Field className="form-field" name="zipCode" component="input" type="text" required />
      <label className="form-label" htmlFor="city">Ville *</label>
      <Field className="form-field" name="city" component="input" type="text" required />
      <label className="form-label" htmlFor="phone">Téléphone</label>
      <Field className="form-field" name="phone" component="input" type="text" />
      <label className="form-label" htmlFor="fax">Fax</label>
      <Field className="form-field" name="fax" component="input" type="text" />
      <label className="form-label" htmlFor="vatNumber">N° de TVA *</label>
      <Field className="form-field" name="vatNumber" component="input" type="text" required />
      <label className="form-label" htmlFor="email">Votre email *</label>
      <Field className="form-field" name="email" component="input" type="email" required />
      <label className="form-label" htmlFor="bankIban">N° de compte IBAN *</label>
      <Field className="form-field" name="bankIban" component="input" type="text" required />
      <label className="form-label" htmlFor="bankBic">N° de BIC *</label>
      <Field className="form-field" name="bankBic" component="input" type="text" required />
      <label className="form-label" htmlFor="bankRib">RIB</label>
      <Field className="form-field" name="bankRib" component="input" type="text" />
      <label className="form-label" htmlFor="bankDomiciliation">Nom de la banque *</label>
      <Field className="form-field" name="bankDomiciliation" component="input" type="text" required />
      <label className="form-label" htmlFor="paymentTerm">Délai de paiement accordé à vos clients *</label>
      <Field className="form-field" name="paymentTerm" component="input" type="text" required />
      <label className="form-label" htmlFor="companyInformation">Informations légales</label>
      <Field className="form-field" name="companyInformation" component="input" type="text" />
      <label className="form-label" htmlFor="website">Site internet</label>
      <Field className="form-field" name="website" component="input" type="text" />
      <label className="form-label" htmlFor="logo">Votre Logo</label>
      <Field className="form-field" name="logo" component={InputFile} />
      <button className="form-button">Créer</button>
    </form>
  );
};

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    console.log(values);
    const formData = new FormData();
    for (let key in values) {
      console.log(key);
      formData.append(key, values[key]);
    }
    console.log(formData.get('logo'));

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    // dispatch(createCompany(values));
    axios.post('/api/company/new', formData, config)
      .then(response => console.log(response));

  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'signup',
})(SignupForm));
