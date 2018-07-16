import { connect } from 'react-redux';
import { change } from 'redux-form';
import { axios } from 'axios';

import { createInvoice, loadInvoices } from '~/store/reducers/dataActionCreator';
import Edit from '~/components/Forms/invoice/Edit';

const mapStateToProps = state => ({
  products: state.data.products,
});

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
    dispatch(createInvoice(values));
    dispatch(loadInvoices());
  },
  dispatch: (actionCreator) => {
    dispatch(actionCreator);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(Edit);
