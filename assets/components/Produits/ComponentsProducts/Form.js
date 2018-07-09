import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const Form = ({ handleSubmit }) => (
  <form className="form" onSubmit={handleSubmit}>
    <h1 className="form-title">Modification d'un produit</h1>
    <label className="form-label" htmlFor="denomination">Dénomination</label>
    <Field className="form-field" name="denomination" component="input" type="text" />
    <label className="form-label" htmlFor="reference">Référence</label>
    <Field className="form-field" name="reference" component="input" type="text" />
    <label className="form-label" htmlFor="description">Description</label>
    <Field className="form-field" name="description" component="input" type="text" />
    <label className="form-label" htmlFor="price">Prix</label>
    <Field className="form-field" name="price" component="input" type="text" />
    <label className="form-label" htmlFor="unity">Unité</label>
    <Field className="form-field" name="unity" component="input" type="text" />
    <button className="form-button" type="submit">Créer</button>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
