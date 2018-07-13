import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';

import ProductInvoiceItem from './ProductInvoiceItem';

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
    this.setState({
      modal: !this.state.modal,
    });
  }

  productSubmit = (fieldName, values, callback) => {
    axios.post('/api/product/new', values)
      .then((response) => {
        if (response.data.succes) {
          callback();
          this.props.changeProducts(response.data.id, this.getProducts, fieldName);
        }
      });
  }

  render() {
    return (
      <div className="add-product">
        { this.props.fields.map((product, index) => (
          <ProductInvoiceItem
            key={index}
            {...this.props}
            product={product}
            index={index}
            products={this.state.products}
            changProducts={this.props.changeProducts}
            loading={this.state.loading}
            productSubmit={this.productSubmit}
            fillPrice={this.props.fillPrice}
          />
        )) }
        <Button
          className="form-btn form-btn-add-product"
          id="btn-activated"
          type="button"
          onClick={() => this.props.fields.push({})}
        >
          Ajouter un produit
        </Button>
      </div>
    );
  }
}

ProductInvoice.propTypes = {
  changeProducts: PropTypes.func.isRequired,
  fillPrice: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default ProductInvoice;
