import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

const Test = (props) => {
  console.log(props);
  return (
    <div>
      ok
    </div>
  );
};

const mapStateToProps = state => ({
  ok: 'ok',
});

const mapDispatchToProps = dispatch => ({
  ok2: 'ok',
});

export default connect(
  null,
  mapDispatchToProps,
)(Test);
