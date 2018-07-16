import { connect } from 'react-redux';
import CreateClient from '~/components/Forms/customer/Create';
import { createCustomer } from '~/store/reducers/dataActionCreator';

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(createCustomer(values));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateClient);
