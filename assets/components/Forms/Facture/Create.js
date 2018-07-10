import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import CreateClient from '~/components/Forms/Client/Create';

import './formFacture.scss';

class CreateFacture extends React.Component {
  state = {
    clients: [],
    idNewClient: 0,
    modal: false,
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = () => {
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
      return <option key={client.id} value={client.id} >{valueModal}</option>;
    });
  }

  submit = (values) => {
    axios.post('/api/customer/new', values)
      .then((response) => {
        console.log(response);
        if(response.data.succes) {
          this.toggle();
          this.props.changeCustomers(response.data.id, this.getCustomers);
          // this.setState({
          //   idNewClient: response.data.id,
          // }, this.getCustomers);
          console.log(this.state.idNewClient);
        }
      });
  }
  toggleValue = () => {
    console.log('in toggle value');
    this.setState({
      idNewClient: 'toctoc',
    });
  }

  selectHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      idNewClient: value,
    });
  }

  invoiceCreateSubmit = values => {
    console.log('mon submit', values);
  }      
  
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="selectClient">Client</label>
          <h1>{this.state.idNewClient}</h1>
          <Field component="select" name="selectClient">
            <option>Sélectionnez votre client</option>
            {this.getClientJSX()}
            <option value="toctoc">toctoc</option>
            <option value={3}>tactac</option>
          </Field>
          <Button onClick={this.toggle} className="modal-button">
            <FontAwesomeIcon className="modal-icon" icon={faPlus} />
          </Button>
          <Button type='submit'>submit invoice</Button>
        </form>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Créez votre client</ModalHeader>
          <ModalBody>
            <CreateClient onSubmit={this.submit} />
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

const mapDispatchToProps = dispatch => ({
  changeCustomers: (id, callback) => {
    dispatch(change('facture', 'selectClient', id));
    callback();
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(CreateFacture));
