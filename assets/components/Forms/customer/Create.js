import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

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
  searchVat: PropTypes.func.isRequired,
};

CreateCustomer = reduxForm({
  // a unique name for the form
  form: 'client',
})(CreateCustomer);

const selector = formValueSelector('client');

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = ({ state }, { dispatch }) => ({
  onSubmit: (values) => {
    axios.post('/api/customer/new', values)
      .then(() => {
        dispatch(push('/customers'));
      });
  },
  searchVat: () => {
    const vatNumber = selector(state, 'vatNumber');
    const key = '8483659eea282a0f9ab0232f1276a297';
    axios.get(`http://www.apilayer.net/api/validate&access_key=${key}&vat_number=${vatNumber}`)
      .then(response => {
        if (response.data.valid) {
          const {
            company_address,
            company_name,
            country_code,
          } = response.data;
          const arrayAddress = company_address.split('\n');
          const arrayZipCity = arrayAddress[1].split(' ');
          let city = arrayZipCity.slice(1);
          if (typeof city === 'array') {
            city = city.join(' ');
          }
          dispatch(change('client', 'customerCompany', company_name));
          dispatch(change('client', 'countryCode', country_code));
          dispatch(change('client', 'companyAdress', arrayAddress[0]));
          dispatch(change('client', 'zipCode', arrayZipCity[0]));
          dispatch(change('client', 'city', city));
          dispatch(change('client', 'pro', '1'));
        }
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CreateCustomer);
