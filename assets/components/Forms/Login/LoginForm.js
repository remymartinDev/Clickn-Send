import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { loggedIn, userConnected } from '~/store/reducers/localActionCreator';

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
    axios.post('/login', values)
      .then((response) => {
        if (response.data.succes) {
          const user = JSON.stringify(response.data.user);
          sessionStorage.setItem('user', user);
          dispatch(loggedIn());
          dispatch(userConnected(response.data.user));
        }
      });
  },   
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'login',
})(LoginForm));
