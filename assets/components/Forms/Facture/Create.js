import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import CreateClient from '~/components/Forms/Client/Create';

import './formFacture.scss';

class CreateFacture extends React.Component {
  state = {
    clients : [],
    modal: false,
  }

  componentDidMount() {
    axios.get('/api/customers')
      .then(({data:clients}) => {
        this.setState({
          clients,
        });
      });
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  getClientJSX = () => {
    return this.state.clients.map((client) => {
      const valueModal = client.pro ? client.customerCompany : client.lastname;
      return <option key={client.id} value={client.id}>{valueModal}</option>;
    });
  }

  submit = (values) => {
    axios.post('/api/customer/new', values)
      .then((response) => {
        console.log(response);
        this.toggle();
        
      });
  }
  
  render() {
    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="selectClient">Client</label>{' '}
          <Field name="selectClient" component="select">
            <option>Sélectionnez votre client</option>
            {this.getClientJSX()}
          </Field>
          <Button onClick={this.toggle} className="modal-button">
            <FontAwesomeIcon className="modal-icon" icon={faPlus} />
          </Button>
        </Form>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Créez votre client</ModalHeader>
          <ModalBody>
            <CreateClient onSubmit={this.submit}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Créer</Button>
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </div> 
    );
  }
}

CreateFacture.propTypes = {};

export default reduxForm({
  form: 'facture',
})(CreateFacture);
