import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './formFacture.scss';

const CreateFacture = props => {
const { handleSubmit } = props;  
  return (
    <form>
      formulaire de création de facture
    </form>
  );
};


export default reduxForm({
  form: 'facture'
})(CreateFacture);
