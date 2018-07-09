import React from 'react';
import { Field, reduxForm } from 'redux-form';

/* eslint-disable */
let CreateProduct = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dénomination">Dénomination</label>
        <Field name="dénomination" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="référence">Référence</label>
        <Field name="référence" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Field name="description" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="prix">Prix</label>
        <Field name="prix" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="unité">Unité</label>
        <Field name="unité" component="input" type="text" />
      </div>
      <button type="submit">Créer</button>
    </form>
  )
}

CreateProduct = reduxForm({
  // a unique name for the form
  form: 'produit',
})(CreateProduct);

export default CreateProduct;