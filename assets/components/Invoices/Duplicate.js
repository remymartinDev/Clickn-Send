import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { load } from '~/store/reducers/localActionCreator';
import InvoiceDuplicateContainer from '~/containers/InvoiceDuplicateContainer';

class DuplicateInvoice extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/invoice/${id}`)
      .then(({ data }) => {
        this.props.load(data);
      });
  }

  render() {
    return <InvoiceDuplicateContainer />;
  }
}

DuplicateInvoice.propTypes = {
  match: PropTypes.object.isRequired,
  load: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ load }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(DuplicateInvoice);
