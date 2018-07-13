import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button } from 'reactstrap';
import axios from 'axios';

import ProductInvoice from './ProductInvoice';
import CustomerInvoice from './CustomerInvoice';
import StatusInvoice from './StatusInvoice';

import './formFacture.scss';

const CreateFacture = ({
  changeCustomers,
  changeProducts,
  handleSubmit,
  fillPrice,
}) => (
  <div className="page-container-invoice-create">
    <h1 className="title-invoice">Créer votre facture</h1>
    <form onSubmit={handleSubmit} className="form-create-invoice">
      <CustomerInvoice changeCustomers={changeCustomers} />
      <FieldArray name="invoiceHasProducts" component={ProductInvoice} fillPrice={fillPrice} changeProducts={changeProducts} />
      <div className="form-mentions">
        <label htmlFor="legalNotice">Mentions légales si HTVA</label>
        <Field component="textarea" name="legalNotice" className="form-mentions-field" />
      </div>
      <StatusInvoice />
      <Button type="submit" className="form-btn form-btn-submit">Générer votre facture</Button>
    </form>
  </div>
);


CreateFacture.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  changeCustomers: PropTypes.func.isRequired,
  changeProducts: PropTypes.func.isRequired,
  fillPrice: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  changeCustomers: (id, callback) => {
    dispatch(change('facture', 'customer', id));
    callback();
  },
  changeProducts: (id, callback, fieldName) => {
    dispatch(change('facture', fieldName, id));
    callback();
  },
  fillPrice: (id, fieldName) => {
    axios.get('/api/product/' + id)
      .then((response) => {
        dispatch(change('facture', fieldName, response.data.price));
      });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(CreateFacture));
