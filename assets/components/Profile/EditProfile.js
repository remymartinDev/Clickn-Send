import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import { push } from 'connected-react-router';
import { bindActionCreator } from 'redux';

import Form from '~/components/Forms/Signup/Form';
import { userConnected, loggedOut } from '~/store/reducers/localActionCreator';

const mapStateToProps = (state) => {
  const initialValues = {
    ...state.notreReducer.userConnected.company,
    _username: state.notreReducer.userConnected.username,
  };
  return ({
    initialValues,
    title: 'Editer votre compte',
    buttonValue: 'Editer',
    editMode: true,
    style: {
      margin: '1rem',
    },
  });
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreator({ loggedOut }, dispatch),
  onSubmit: (values) => {
    console.log('in edition', values);
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
    axios.post('/api/company/admin/edit', formData, config)
      .then(() => {
        axios.get('/api/user')
          .then(({ data: { user } }) => {
            const userJSON = JSON.stringify(user);
            sessionStorage.setItem('user', userJSON);
            dispatch(userConnected(user));
            dispatch(push('/'));
          });
      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'signup',
})(Form));
