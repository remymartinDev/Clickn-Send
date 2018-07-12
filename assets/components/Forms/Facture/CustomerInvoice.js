import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import CreateClient from '~/components/Forms/Client/Create';
import Loading from '~/components/utils/Loading';

class CustomerInvoice extends React.Component {
  state = {
    modal: false,
    customers: [],
    loading: true,
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    axios.get('/api/customers')
      .then(({ data: customers }) => {
        this.setState({
          customers,
          loading: false,
        });
      });
  }

  getCustomersJSX = () => (
    this.state.customers.map((customer) => {
      const valueModal = customer.pro ? customer.customerCompany : customer.lastname;
      return <option key={customer.id} value={customer.id} >{valueModal}</option>;
    })
  )

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
      // <div className="add-client">
      <React.Fragment>
        <div className="add-client">
          <Field component="select" name="customer" className="fieldSelect">
            <option>Sélectionner votre client</option>
            {this.getCustomersJSX()}
          </Field>
          <Button onClick={this.toggle} className="modal-button">
            <FontAwesomeIcon className="modal-icon" icon={faPlus} />
          </Button>
          {this.state.loading && <Loading />}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="custom-modal">
          <ModalHeader toggle={this.toggle}>Créer votre client</ModalHeader>
          <ModalBody>
            <CreateClient onSubmit={this.customerSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Créer</Button>
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
      // </div>
    );
  }
}

CustomerInvoice.propTypes = {
  changeCustomers: PropTypes.func.isRequired,
};

export default CustomerInvoice;
