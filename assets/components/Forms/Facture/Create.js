import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import './formFacture.scss';

const CreateFacture = ({ handleSubmit }) => (
  <form>
    formulaire de création de facture
  </form>  
);

CreateFacture.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'facture',
})(CreateFacture);
