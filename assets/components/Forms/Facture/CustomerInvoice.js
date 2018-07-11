import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import CreateClient from '~/components/Forms/Client/Create';

class CustomerInvoice extends React.Component {
  state = {
    modal: false,
    customers: [],
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = () => {
    axios.get('/api/customers')
      .then(({ data: customers }) => {
        this.setState({
          customers,
        });
      });
  }

  getCustomersJSX = () => {
    return this.state.customers.map((customer) => {
      const valueModal = customer.pro ? customer.customerCompany : customer.lastname;
      return <option key={customer.id} value={customer.id} >{valueModal}</option>;
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  customerSubmit = (values) => {
    axios.post('/api/customer/new', values)
      .then((response) => {
        if (response.data.succes) {
          this.toggle();
          this.props.changeCustomers(response.data.id, this.getCustomers);
        }
      });
  }

  render() {
    return (
      <div className="add-client">
        <label htmlFor="customerId">Client</label>
        <h1>{this.state.idNewClient}</h1>
        <Field component="select" name="customerId">
          <option>Sélectionnez votre client</option>
          {this.getCustomersJSX()}
        </Field>
        <Button onClick={this.toggle} className="modal-button">
          <FontAwesomeIcon className="modal-icon" icon={faPlus} />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Créez votre client</ModalHeader>
          <ModalBody>
            <CreateClient onSubmit={this.customerSubmit} />
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

CustomerInvoice.propTypes = {
  changeCustomers: PropTypes.func.isRequired,
};

export default CustomerInvoice;
