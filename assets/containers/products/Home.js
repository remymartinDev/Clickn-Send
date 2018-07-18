import { connect } from 'react-redux';
import Home from '~/components/Products/Home';
import { bindActionCreators } from 'redux';

import { loadProducts } from '~/store/reducers/dataActionCreator';

const mapStateToProps = state => ({
  products: state.data.products,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadProducts }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
