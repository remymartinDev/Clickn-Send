import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Tooltip } from 'reactstrap';

import { loggedIn, userConnected } from '~/store/reducers/localActionCreator';
import Loading from '~/components/utils/Loading';
import './login.scss';

const renderField = ({
  type,
  label,
  input,
  meta: { touched, error },

}) => (
  <React.Fragment>
    <label htmlFor={input.name} className="form-label">{label}</label>
    <input className="form-field" name={input.name} id={input.name} {...input} type={type} />
    <Tooltip placement="right" isOpen={error && touched} target={input.name}>
      <span>{error}</span>
    </Tooltip>
  </React.Fragment>
);

renderField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const LoginForm = ({ handleSubmit, submitting }) => (
  <form className="form login-form" onSubmit={handleSubmit}>
    <h1 className="form login-form-title">Login</h1>
    <Field name="username" type="text" label="Identifiant" component={renderField} />
    <Field name="password" type="password" label="Modt de passe" component={renderField} />
    <button style={{ position: 'relative' }} className="form login-form-btn" type="submit" disabled={submitting}>s'identifier {submitting && <Loading />}</button>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => axios.post('/login', values),
  onSubmitFail: (errors, dispatch, submitError) => console.log(errors, submitError),
  onSubmitSuccess: (result) => {
    const user = JSON.stringify(result.data.user);
    sessionStorage.setItem('user', user);
    dispatch(loggedIn());
    dispatch(userConnected(result.data.user));
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Identifiant ou email requis';
  }
  if (!values.password) {
    errors.password = 'Mot de passe requis';
  }
  return errors;
};

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'login',
  validate,
})(LoginForm));
