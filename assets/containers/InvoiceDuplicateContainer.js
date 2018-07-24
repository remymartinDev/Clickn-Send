import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import axios from 'axios';

import { loadInvoices } from '~/store/reducers/dataActionCreator';
import Duplicate from '~/components/Forms/invoice/Duplicate';
import { push } from 'connected-react-router';

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
    axios.post(`/api/invoice/${values.id}/copy`, values)
      .then((response) => {
        console.log(response);
        console.log('je duplique');
        dispatch(loadInvoices());
        dispatch(push('/invoices'));
      });
  },
});

const mapStateToProps = (state) => {
  // Récupération de la facture
  const currentInvoice = state.notreReducer.data;
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
      id: product.id,
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
})(Duplicate));
