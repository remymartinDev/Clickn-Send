import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button } from 'reactstrap';


import ProductInvoice from './ProductInvoice';
import CustomerInvoice from './CustomerInvoice';

import './formFacture.scss';

const CreateFacture = ({ changeCustomers, changeProducts, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CustomerInvoice changeCustomers={changeCustomers} />
        <FieldArray name="invoiceHasProducts" component={ProductInvoice} changeProducts={changeProducts} />
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
  changeProducts: (id, callback) => {
    dispatch(change('facture', 'productId', id));
    callback();
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(CreateFacture));
