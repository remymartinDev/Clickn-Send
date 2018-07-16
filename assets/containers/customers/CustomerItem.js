import { connect } from 'react-redux';
import CustomerItem from '~/components/Customers/ComponentsCustomers/CustomerItem';

import { deleteCustomer } from '~/store/reducers/dataActionCreator';

const mapDispatchToProps = dispatch => ({
  deleteCustomer: id => () => {
    dispatch(deleteCustomer(id));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(CustomerItem);
