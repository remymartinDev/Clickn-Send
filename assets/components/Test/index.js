import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

const changeHandler = (event, newValue, previousValue, name) => {
  console.log(event, newValue, previousValue, name);
}

const changeValue = handler => (e) => {
  const file = e.target.files;
  handler(file[0]);
};

const Input = ({ input: { onChange } }) => (
  <input type="file" onChange={changeValue(onChange)} />
);

Input.PropTypes = {
  input: PropTypes.object.isRequired,
};

const Test = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="nom">Nom</label>
    <Field name="nom" component="input" type="text" />
    <Field component={Input} name="myfiles" onChange={changeHandler} />
    <input type="submit" value="ok" />
  </form>
);

const mapStateToProps = null;

const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    console.log(values);
    console.log('in submit', values.myfiles);
    const formData = new FormData();
    console.log('name', values.myfiles.name);
    formData.append('nom', values.nom);
    formData.append('filesfiles', values.myfiles, values.myfiles.name);
    const config = {
      onUploadProgress: (progressEvent) => {
        console.log('chargement', progressEvent.loaded, progressEvent.total);
      },
      onDownloadProgress: (progress) => {
        console.log('loading', progress.total);
      },
    };
    axios.post('/data/logo', formData, config)
      .then(response => console.log(response.data));
  },
});

Test.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'loadImage',
})(Test));
