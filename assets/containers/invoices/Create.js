import { connect } from 'react-redux';
import Create from '~/components/Invoices/Create';
import { bindActionCreators } from 'redux';

import { createInvoice } from '~/store/reducers/dataActionCreator';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createInvoice }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create);
