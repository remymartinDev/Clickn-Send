import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Button } from 'reactstrap';

import ProductInvoice from './ProductInvoice';
import CustomerInvoice from './CustomerInvoice';
import StatusInvoice from './StatusInvoice';

import './formFacture.scss';

const EditInvoice = ({
  changeCustomers,
  changeProducts,
  handleSubmit,
  fillPrice,
}) => (
  <div className="page-container-invoice-create">
    <h1 className="title-invoice">Edition facture</h1>
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


EditInvoice.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  changeCustomers: PropTypes.func.isRequired,
  changeProducts: PropTypes.func.isRequired,
  fillPrice: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'facture',
  enableReinitialize: true,
})(EditInvoice);
