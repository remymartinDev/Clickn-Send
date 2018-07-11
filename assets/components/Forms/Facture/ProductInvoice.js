import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import FaTrash from 'react-icons/lib/fa/trash';

import CreateProduct from '~/components/Forms/Produit/Create';

class ProductInvoice extends React.Component {
  state = {
    products: [],
    modal: false,
  }

  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    axios.get('/api/products')
      .then(({ data: products }) => {
        this.setState({
          products,
        });
      });
  }
  getProductsJSX = () => {
    return this.state.products.map((product) => {
      return <option key={product.id} value={product.id} >{product.denomination}</option>;
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }
  productSubmit = (values) => {
    axios.post('/api/product/new', values)
      .then((response) => {
        if (response.data.succes) {
          this.toggle();
          this.props.changeProducts(response.data.id, this.getProducts);
        }
      });
  }

  render() {
    return (
      <div className="add-produit">
        <Button type="button" onClick={() => this.props.fields.push({})}>Ajouter un produit</Button>
        {
          this.props.fields.map((product, index) => (
            <React.Fragment key={`${product}.productId`}>
              <label htmlFor={`${product}.productId`}>Produit</label>
              <Field component="select" name={`${product}.productId`}>
                <option>Sélectionnez votre produit</option>
                {this.getProductsJSX()}
              </Field>
              <Button onClick={this.toggle} className="modal-button">
                <FontAwesomeIcon className="modal-icon" icon={faPlus} />
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Créez votre produit</ModalHeader>
                <ModalBody>
                  <CreateProduct onSubmit={this.productSubmit} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Créer</Button>
                  <Button color="secondary" onClick={this.toggle}>Annuler</Button>
                </ModalFooter>
              </Modal>
              <label htmlFor={`${product}.quantity`}>Quantité</label>
              <Field component="input" type="text" name={`${product}.quantity`} />
              <label htmlFor={`${product}.vatRate`}>Taux de TVA</label>
              <Field component="input" type="text" name={`${product}.vatRate`} />
              <label htmlFor={`${product}.remise`}>Remise</label>
              <Field component="input" type="text" name={`${product}.remise`} />
              <label htmlFor={`${product}.htva`}>Mentions légales si HTVA</label>
              <Field component="textarea" name={`${product}.htva`} />
              <button
                type="button"
                title="Remove Product"
                onClick={() => this.props.fields.remove(index)}
              >
                <FaTrash className="trash-icon" />
              </button>
            </React.Fragment>
          ))
        }   
      </div>
    );
  }
}

ProductInvoice.propTypes = {
  changeProducts: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default ProductInvoice;
