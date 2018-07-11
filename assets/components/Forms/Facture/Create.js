import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import CreateClient from '~/components/Forms/Client/Create';
import CreateProduct from '~/components/Forms/Produit/Create';

import './formFacture.scss';

class CreateFacture extends React.Component {
  
  state = {
    customers: [],
    products: [],
    addedProducts: [],
    customerModal: false,
    productModal: false,
  }

  componentDidMount() {
    this.getCustomers();
    this.getProducts();
  }

  getCustomers = () => {
    axios.get('/api/customers')
      .then(({ data: customers }) => {
        this.setState({
          customers,
        });
      });
  }

  getProducts = () => {
    axios.get('/api/products')
      .then(({ data: products }) => {
        this.setState({
          products,
        });
      });
  }

  getCustomersJSX = () => {
    return this.state.customers.map((customer) => {
      const valueModal = customer.pro ? customer.customerCompany : customer.lastname;
      return <option key={customer.id} value={customer.id} >{valueModal}</option>;
    });
  }
  getProductsJSX = () => {
    return this.state.products.map((product) => {
      return <option key={product.id} value={product.id} >{product.denomination}</option>;
    });
  }
    
  toggle = modal => () => {
    console.log('toggle modal', this.state[modal], modal);
    this.setState({
      [modal]: !this.state[modal],
    });
  }

  customerSubmit = (values) => {
    axios.post('/api/customer/new', values)
      .then((response) => {
        if (response.data.succes) {
          this.toggle('customerModal')();
          this.props.changeCustomers(response.data.id, this.getCustomers);
        }
      });
  }
  productSubmit = (values) => {
    axios.post('/api/product/new', values)
      .then((response) => {
        if (response.data.succes) {
          this.toggle('productModal')();
          this.props.changeProducts(response.data.id, this.getProducts);
        }
      });
  }        

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="add-client">
            <label htmlFor="customerId">Client</label>
            <h1>{this.state.idNewClient}</h1>
            <Field component="select" name="customerId">
              <option>Sélectionnez votre client</option>
              {this.getCustomersJSX()}
            </Field>
            <Button onClick={this.toggle('customerModal')} className="modal-button">
              <FontAwesomeIcon className="modal-icon" icon={faPlus} />
            </Button>
            <Modal isOpen={this.state.customerModal} toggle={this.toggle('customerModal')}>
              <ModalHeader toggle={this.toggle('customerModal')}>Créez votre client</ModalHeader>
              <ModalBody>
                <CreateClient onSubmit={this.customerSubmit} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle('customerModal')}>Créer</Button>
                <Button color="secondary" onClick={this.toggle('customerModal')}>Annuler</Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="add-produit">
            <label htmlFor="productId">Produit</label>
            <h1>{this.state.idNewClient}</h1>
            <Field component="select" name="productId">
              <option>Sélectionnez votre produit</option>
              {this.getProductsJSX()}
            </Field>
            <Button onClick={this.toggle('productModal')} className="modal-button">
              <FontAwesomeIcon className="modal-icon" icon={faPlus} />
            </Button>
            <Modal isOpen={this.state.productModal} toggle={this.toggle('productModal')}>
              <ModalHeader toggle={this.toggle('productModal')}>Créez votre produit</ModalHeader>
              <ModalBody>
                <CreateProduct onSubmit={this.productSubmit} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle('productModal')}>Créer</Button>
                <Button color="secondary" onClick={this.toggle('productModal')}>Annuler</Button>
              </ModalFooter>
            </Modal>
            <Field component="text" name="quantity"></Field>
          </div>
          <Button type="submit">Générer votre facture</Button>
        </form>
      </div>
    );
  }
}

CreateFacture.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  changeCustomers: PropTypes.func.isRequired,
  changeProducts: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  changeCustomers: (id, callback) => {
    dispatch(change('facture', 'customerId', id));
    callback();
  },
  changeProducts: (id, callback) => {
    dispatch(change('facture', 'productId', id));
    callback();
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(CreateFacture));
