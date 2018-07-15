import { connect } from 'react-redux';
import CreateClient from '~/components/Forms/customer/Create';
import { createCustomer, loadCustomers } from '~/store/reducers/dataActionCreator';
import { closeModal } from '~/store/reducers/localActionCreator';
import { change } from 'redux-form';
import axios from 'axios';

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(createCustomer(values));
    // axios.post('/api/customer/new', values)
    //   .then((response) => {
    //     console.log(response.data);
    //     dispatch(loadCustomers());
    //     dispatch(closeModal());
    //     dispatch(change('facture', 'customer', response.data.id));
    //   });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateClient);
