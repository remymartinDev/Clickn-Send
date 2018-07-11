import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button } from 'reactstrap';


import ProductInvoice from './ProductInvoice';
import CustomerInvoice from './CustomerInvoice';
import StatusInvoice from './StatusInvoice';

import './formFacture.scss';

const CreateFacture = ({ changeCustomers, changeProducts, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CustomerInvoice changeCustomers={changeCustomers} />
        <FieldArray name="invoiceHasProducts" component={ProductInvoice} changeProducts={changeProducts} />
        <label htmlFor="HTVA">Mentions légales si HTVA</label>
        <Field component="textarea" name="HTVA" />
        <StatusInvoice />
        <Button type="submit">Générer votre facture</Button>
      </form>
    </div>
  );
}

CreateFacture.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  changeCustomers: PropTypes.func.isRequired,
  changeProducts: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  changeCustomers: (id, callback) => {
    dispatch(change('facture', 'customerId', id));
    callback();
  },
  changeProducts: (id, callback, fieldName) => {
    dispatch(change('facture', fieldName, id));
    callback();
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(CreateFacture));
