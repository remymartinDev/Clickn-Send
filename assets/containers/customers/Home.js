import { connect } from 'react-redux';
import Home from '~/components/Customers/Home';

const mapStateToProps = state => ({
  customers: state.data.customers,
});

export default connect(
  mapStateToProps,
  null,
)(Home);
