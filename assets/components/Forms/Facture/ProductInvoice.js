import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Field } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FaTrash from 'react-icons/lib/fa/trash';

import CreateProduct from '~/components/Forms/Produit/Create';
import Loading from '~/components/utils/Loading';

class ProductInvoice extends React.Component {
  state = {
    products: [],
    modal: false,
    loading: true,
  }

  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    axios.get('/api/products')
      .then(({ data: products }) => {
        this.setState({
          products,
          loading: false,
        });
      });
  }
  getProductsJSX = () => (
    this.state.products.map(product => (
      <option key={product.id} value={product.id} >{product.denomination}</option>
    ))
  )

  toggle = () => {
    console.log('in toggle');
    this.setState({
      modal: !this.state.modal,
    });
  }
  // productSubmit = fieldName => (values) => {
  //   console.log('in submit', fieldName);
  //   axios.post('/api/product/new', values)
  //     .then((response) => {
  //       if (response.data.succes) {
  //         this.toggle();
  //         this.props.changeProducts(response.data.id, this.getProducts, fieldName);
  //       }
  //     });
  // }

  productSubmit = (fieldName) => {
    return (values) => {
      axios.post('/api/product/new', values)
        .then((response) => {
          if (response.data.succes) {
            this.toggle();
            console.log('in axios', fieldName);
            this.props.changeProducts(response.data.id, this.getProducts, fieldName);
          }
        });
    };
  }

  render() {
    return (
      <div className="add-product">
        {
          this.props.fields.map((product, index) => {
            let tempProduct = product;
            console.log(product);
            return (
              <div key={`${product}.product`} className="add-product-select">
                {/* <label htmlFor={`${product}.product`}>Produit</label> */}
                <div className="add-product-select-product">
                  <Field component="select" name={`${product}.product`} className="fieldSelect">
                    <option>Sélectionner votre produit</option>
                    {this.getProductsJSX()}
                  </Field>
                  <Button onClick={this.toggle} className="modal-button">
                    <FontAwesomeIcon className="modal-icon" icon={faPlus} />
                  </Button>
                  {this.state.loading && <Loading />}
                </div>
                <div>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Créer votre produit</ModalHeader>
                    <ModalBody>
                      <CreateProduct onSubmit={this.productSubmit(`${tempProduct}.product`)} />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle}>Annuler</Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <label htmlFor={`${product}.quantity`}>Quantité</label>
                <Field component="input" type="text" name={`${product}.quantity`} />
                <label htmlFor={`${product}.vatRate`}>Taux de TVA</label>
                <Field component="input" type="text" name={`${product}.vatRate`} />
                <label htmlFor={`${product}.remise`}>Remise</label>
                <Field component="input" type="text" name={`${product}.remise`} />
                <button
                  type="button"
                  title="Remove Product"
                  className="btn-remove"
                  onClick={() => this.props.fields.remove(index)}
                >
                  <FaTrash className="trash-icon" />
                </button>
              </div>
            );
          })
        }
        <Button className="form-btn form-btn-add-product" type="button" onClick={() => this.props.fields.push({})}>Ajouter un produit</Button>
      </div>
    );
  }
}

ProductInvoice.propTypes = {
  changeProducts: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default ProductInvoice;
