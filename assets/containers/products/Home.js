import { connect } from 'react-redux';

import Home from '~/components/Products/Home';

const mapStateToProps = state => ({
  products: state.data.products,
});

export default connect(
  mapStateToProps,
  null,
)(Home);
