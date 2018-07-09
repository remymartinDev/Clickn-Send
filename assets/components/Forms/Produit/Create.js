import React from 'react';
import { Field, reduxForm } from 'redux-form';

/* eslint-disable */
let CreateProduct = props => {
  const { handleSubmit } = props
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-title">Création d'un produit</h1>
      <label className="form-label" htmlFor="denomination">Dénomination</label>
      <Field className="form-field" name="denomination" component="input" type="text" />
      <label className="form-label" htmlFor="reference">Référence</label>
      <Field className="form-field" name="reference" component="input" type="text" />
      <label className="form-label" htmlFor="description">Description</label>
      <Field className="form-field" name="description" component="input" type="text" />
      <label className="form-label" htmlFor="prix">Prix</label>
      <Field className="form-field" name="prix" component="input" type="text" />
      <label className="form-label" htmlFor="unite">Unité</label>
      <Field className="form-field" name="unite" component="input" type="text" />
      <button className="form-button" type="submit">Créer</button>
    </form>
  )
}

CreateProduct = reduxForm({
  // a unique name for the form
  form: 'produit',
})(CreateProduct);

export default CreateProduct;