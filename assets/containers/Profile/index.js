import { connect } from 'react-redux';

import ViewProfile from '~/components/Profile/ViewProfile';

const mapStateToProps = state => ({
  userConnected: state.notreReducer.userConnected,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewProfile);
