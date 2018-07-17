import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadCustomers } from '~/store/reducers/dataActionCreator';
import Home from '~/components/Customers/Home';

const mapStateToProps = state => ({
  customers: state.data.customers,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadCustomers }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
