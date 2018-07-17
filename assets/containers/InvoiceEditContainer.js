import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import axios from 'axios';

import { createInvoice, loadInvoices } from '~/store/reducers/dataActionCreator';
import InvoiceForm from '~/components/Forms/invoice/InvoiceForm';

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
  onSubmit: (values) => {
    console.log('create invoice');
    console.log(values);
    dispatch(createInvoice(values));
    dispatch(loadInvoices());
  },
});

const mapStateToProps = (state) => {
  const currentInvoice = state.notreReducer.data;
  console.log(currentInvoice);
  if (currentInvoice) {
    const {
      id,
      customer: { id: customerId },
      customer: { remise },
      amountAllTaxes,
      amountDuttyFree,
      amountCustomerRemise,
      taxesAmount,
      status: { id: status },
      legalNotice,
    } = currentInvoice;
    const invoiceHasProducts = currentInvoice.invoiceHasProducts.map(product => ({
      product: product.product.id,
      price: product.product.price,
      quantity: product.quantity,
      vatRate: product.vatRate,
      remise: product.remise,
      remiseType: product.remiseType,
      amountDuttyFree: product.amountDuttyFree,
      amountProductRemise: product.amountProductRemise,
      amountAllTaxes: product.amountAllTaxes,
      taxesAmount: product.taxesAmount,

    }));
    const initialValues = {
      id,
      customer: customerId,
      remise,
      amountAllTaxes,
      amountDuttyFree,
      amountCustomerRemise,
      taxesAmount,
      status,
      legalNotice,
      invoiceHasProducts,                            
    };
    return { initialValues };
  }
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
  enableReinitialize: true,
})(InvoiceForm));
