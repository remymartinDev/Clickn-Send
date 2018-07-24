import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RecurredInvoicePdf = ({ pdf }) => (
  <div dangerouslySetInnerHTML={{ __html: pdf }} />
);

RecurredInvoicePdf.propTypes = {
  pdf: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pdf: state.notreReducer.pdf,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecurredInvoicePdf);
