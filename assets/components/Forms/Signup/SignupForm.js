import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import { userConnected, loggedIn } from '~/store/reducers/localActionCreator';
import Form from './Form';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    const formData = new FormData();
    const listKey = Object.keys(values);
    listKey.forEach((key) => {
      formData.append(key, values[key]);
    });

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    axios.post('/api/company/new', formData, config)
      .then((response) => {
        if (response.data.succes) {
          const log = {
            username: values._username,
            password: values._password,
          };
          axios.post('/login', log)
            .then((responseLogin) => {
              dispatch(loggedIn());
              dispatch(userConnected(responseLogin.data.user));
            });
        }
      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'signup',
})(Form));
