import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from 'axios';

const LoginForm = ({ handleSubmit }) => (
  <form className="form signup-form" onSubmit={handleSubmit}>
    <h1>Login</h1>
    <label htmlFor="username" className="form-label">identifiant</label>
    <Field className="form-field" name="username" component="input" type="text" />
    <label htmlFor="password" className="form-label">Mot de passe</label>
    <Field className="form-field" name="password" component="input" type="password" />
    <button type="submit">s'identifier</button>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    console.log(values);
    axios.post('/login', values)
      .then(response => console.log(response));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'login',
})(LoginForm));
