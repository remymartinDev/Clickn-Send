import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import { userConnected, loggedIn } from '~/store/reducers/localActionCreator';
import Form from './Form';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    console.log(values);
    const formData = new FormData();
    const listKey = Object.keys(values);
    listKey.forEach((key) => {
      formData.append(key, values[key]);
    });
    console.log(values);
    console.log(formData.get('logo'));

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (progress) => {
        console.log('upload', progress.loaded, progress.total);
      },
    };
    // dispatch(createCompany(formData));
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
