import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button } from 'reactstrap';

import ProductInvoice from './ProductInvoice';
import CustomerInvoice from './CustomerInvoice';
import StatusInvoice from './StatusInvoice';

import './formFacture.scss';

const CreateFacture = ({
  changeCustomers,
  changeProducts,
  handleSubmit,
}) => (
  <div className="page-container-invoice-create">
    <h1 className="title-invoice">Créer votre facture</h1>
    <form onSubmit={handleSubmit} className="form-create-invoice">
      <CustomerInvoice changeCustomers={changeCustomers} />
      <FieldArray name="invoiceHasProducts" component={ProductInvoice} changeProducts={changeProducts} />
      <div className="form-mentions">
        <label htmlFor="HTVA">Mentions légales si HTVA</label>
        <Field component="textarea" name="HTVA" className="form-mentions-field" />
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
};


const mapDispatchToProps = dispatch => ({
  changeCustomers: (id, callback) => {
    dispatch(change('facture', 'customer', id));
    callback();
  },
  changeProducts: (id, callback, fieldName) => {
    console.log('in mapTo', fieldName);
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
