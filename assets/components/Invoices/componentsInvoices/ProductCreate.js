import { connect } from 'react-redux';

import CreateProduct from '~/components/Forms/Product/Create';
import { createProduct } from '~/store/reducers/dataActionCreator';

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(createProduct(values));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateProduct);
