import { connect } from 'react-redux';
import { change } from 'redux-form';
import axios from 'axios';

import { createInvoice, loadInvoices } from '~/store/reducers/dataActionCreator';
import Duplicate from '~/components/Forms/invoice/Duplicate';

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { id } } } = ownProps;
  const currentInvoice = state.data.invoices.find(invoice => Number(invoice.id) === Number(id));
  const {
    id: invoiceId,
    customer: { id: customer },
    customer: { remise },
    amountDuttyFree,
    taxesAmount,
    amountAllTaxes,
    legalNotice,
    status: { id: statusId },
    invoiceHasProducts,
  } = currentInvoice;

  const initialValues = {
    id: invoiceId,
    customer,
    remise,
    amountDuttyFree,
    taxesAmount,
    amountAllTaxes,
    legalNotice,
    status: statusId,
    invoiceHasProducts,
  };
  console.log(initialValues);
  if (currentInvoice) {
    return {
      initialValues,
    };
  }
  return {};
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
    axios.get(`/api/product/${id}`)
      .then((response) => {
        dispatch(change('facture', fieldName, response.data.price));
      });
  },
  onSubmit: (values) => {
    axios.post(`/api/invoice/${values.id}/copy`, values)
      .then(() => {
        dispatch(loadInvoices());
      });
  },
  dispatch: (actionCreator) => {
    dispatch(actionCreator);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(Duplicate);
