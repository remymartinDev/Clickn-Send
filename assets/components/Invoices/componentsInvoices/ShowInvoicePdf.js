import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class ShowInvoicePdf extends React.Component {
  state = {
    pdf: '',
  }

  componentDidMount() {
    const { selectedInvoiceId: id } = this.props;
    axios.get(`/invoice/${id}/pdfShow`)
      .then((response) => {
        this.setState({
          pdf: response.data,
        });
      });
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pdf }} />
    );
  }
}

ShowInvoicePdf.propTypes = {
  selectedInvoiceId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  selectedInvoiceId: state.notreReducer.selectedInvoiceId,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowInvoicePdf);
