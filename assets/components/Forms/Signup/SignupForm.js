import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createCompany } from '~/store/reducers/dataActionCreator';

const SignupForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-title">Créer votre compte</h1>
      <label className="form-label" htmlFor="companyName">Nom de l'entreprise</label>
      <Field className="form-field" name="companyName" component="input" type="text" />
      <label className="form-label" htmlFor="companyAdress">Adresse de votre entreprise</label>
      <Field className="form-field" name="companyAdress" component="input" type="text" />
      <label className="form-label" htmlFor="zipCode">Code postal</label>
      <Field className="form-field" name="zipCode" component="input" type="text" />
      <label className="form-label" htmlFor="city">Ville</label>
      <Field className="form-field" name="city" component="input" type="text" />
      <label className="form-label" htmlFor="phone">Téléphone</label>
      <Field className="form-field" name="phone" component="input" type="text" />
      <label className="form-label" htmlFor="fax">Fax</label>
      <Field className="form-field" name="fax" component="input" type="text" />
      <label className="form-label" htmlFor="vatNumber">N° de TVA</label>
      <Field className="form-field" name="vatNumber" component="input" type="text" />
      <label className="form-label" htmlFor="email">Votre email</label>
      <Field className="form-field" name="email" component="input" type="email" />
      <label className="form-label" htmlFor="bankIban">N° de compte IBAN</label>
      <Field className="form-field" name="bankIban" component="input" type="text" />
      <label className="form-label" htmlFor="bankBic">N° de BIC</label>
      <Field className="form-field" name="bankBic" component="input" type="text" />
      <label className="form-label" htmlFor="bankRib">RIB</label>
      <Field className="form-field" name="bankRib" component="input" type="text" />
      <label className="form-label" htmlFor="bankDomiciliation">Nom de la banque</label>
      <Field className="form-field" name="bankDomiciliation" component="input" type="text" />
      <label className="form-label" htmlFor="paymentTerm">Délai de paiement accordé à vos clients</label>
      <Field className="form-field" name="paymentTerm" component="input" type="text" />
      <label className="form-label" htmlFor="logo">Votre Logo</label>
      <Field className="form-field" name="logo" component="input" type="text" />
      <label className="form-label" htmlFor="companyInformation">Informations légales</label>
      <Field className="form-field" name="companyInformation" component="input" type="text" />
      <button className="form-button">Créer</button>
    </form>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(createCompany(values));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'signup',
})(SignupForm));
