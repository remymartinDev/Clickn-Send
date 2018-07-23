import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import InputFile from './InputFile';
import './signupForm.scss';

const removeBtnStyle = {
  justifySelf: 'end',
  color: 'red',
  border: '3px solid red',
  fontSize: '1rem',
  cursor: 'pointer',
};

class SignupForm extends React.Component {
  state = {
    modal: false,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  deleteCompany = () => {
    axios.delete('/api/company/admin/delete')
      .then(() => {
        this.toggle();
      });
  }

  render() {
    const {
      handleSubmit,
      title,
      buttonValue,
      style,
      editMode,
    } = this.props;
    return (
      <form style={style} className="form signup-form" onSubmit={handleSubmit}>
        <h1 className="form-title" style={{ margin: '1.5rem' }}>{title}</h1>
        <label className="form-label" htmlFor="companyName">Nom de l'entreprise *</label>
        <Field className="form-field" name="companyName" component="input" type="text" required />
        <label className="form-label" htmlFor="_username">Votre identifiant *</label>
        <Field className="form-field" name="_username" component="input" type="text" required />
        {!editMode &&
          <React.Fragment>
            <label className="form-label" htmlFor="_password">Votre mot de passe *</label>
            <Field className="form-field" name="_password" component="input" type="password" required />
            <label className="form-label" htmlFor="_password2">confirmation de votre mot de passe *</label>
            <Field className="form-field" name="_password2" component="input" type="password" required />
          </React.Fragment>
        }
        <div className="separation" />
        <label className="form-label" htmlFor="companyAdress">Adresse de votre entreprise *</label>
        <Field className="form-field" name="companyAdress" component="input" type="text" required />
        <label className="form-label" htmlFor="zipCode">Code postal *</label>
        <Field className="form-field" name="zipCode" component="input" type="text" required />
        <label className="form-label" htmlFor="city">Ville *</label>
        <Field className="form-field" name="city" component="input" type="text" required />
        <label className="form-label" htmlFor="phone">Téléphone</label>
        <Field className="form-field" name="phone" component="input" type="text" />
        <label className="form-label" htmlFor="fax">Fax</label>
        <Field className="form-field" name="fax" component="input" type="text" />
        <label className="form-label" htmlFor="vatNumber">N° de TVA *</label>
        <Field className="form-field" name="vatNumber" component="input" type="text" required />
        <label className="form-label" htmlFor="email">Votre email *</label>
        <Field className="form-field" name="email" component="input" type="email" required />
        <label className="form-label" htmlFor="bankIban">N° de compte IBAN *</label>
        <Field className="form-field" name="bankIban" component="input" type="text" required />
        <label className="form-label" htmlFor="bankBic">N° de BIC *</label>
        <Field className="form-field" name="bankBic" component="input" type="text" required />
        <label className="form-label" htmlFor="bankRib">RIB</label>
        <Field className="form-field" name="bankRib" component="input" type="text" />
        <label className="form-label" htmlFor="bankDomiciliation">Nom de la banque *</label>
        <Field className="form-field" name="bankDomiciliation" component="input" type="text" required />
        <label className="form-label" htmlFor="paymentTerm">Délai de paiement accordé à vos clients *</label>
        <Field className="form-field" name="paymentTerm" component="input" type="text" required />
        <label className="form-label" htmlFor="companyInformation">Informations légales</label>
        <Field className="form-field" name="companyInformation" component="input" type="text" />
        <label className="form-label" htmlFor="website">Site internet</label>
        <Field className="form-field" name="website" component="input" type="text" />
        <label className="form-label" htmlFor="logo">Votre Logo</label>
        <Field className="form-field" name="logo" component={InputFile} />
        <button className="form-button" type="submit">{buttonValue}</button>
        {editMode &&
          <input type="button" style={removeBtnStyle} className="form-button" value="Supprimer l'entreprise" onClick={this.toggle} />
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Désirez vous vraiment supprimé l'entreprise ?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteCompany}>Supprimer</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </form>
    );
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonValue: PropTypes.string,
  style: PropTypes.object,
  editMode: PropTypes.bool,
};

SignupForm.defaultProps = {
  title: 'Créer votre compte',
  buttonValue: 'Créer',
  style: {},
  editMode: false,
};

export default SignupForm;
