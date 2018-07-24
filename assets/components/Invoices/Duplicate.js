import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { load } from '~/store/reducers/localActionCreator';
import InvoiceEditContainer from '~/containers/InvoiceEditContainer';

class DuplicateInvoice extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    console.log(id);
    axios.get(`/api/invoice/${id}`)
      .then(({ data }) => {
        console.log(data);
        this.props.load(data);
      });
  }

  render() {
    return <InvoiceEditContainer buttonValidation="Dupliquer" />;
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
