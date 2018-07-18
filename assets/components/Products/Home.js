import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ButtonCreate from '~/components/ButtonCreate';
import ProductItem from './ComponentsProducts/ProductItem';
import ProductItemHead from './ComponentsProducts/ProductItemHead';

import './produits.scss';

class Home extends React.Component {
  state = {
    filter: {
      type: 'id',
      asc: false,
    },
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  getProductJSX = () => {
    const orderedProducts = this.order();
    const productsJsx = orderedProducts.map(product => (
      <ProductItem key={product.id} product={product} clickDelete={this.handleDelete} />
    ));
    return productsJsx;
  }

  orderById = () => (
    [...this.props.products].sort((a, b) => {
      const filter = (b.id - a.id);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByDenomination = () => (
    [...this.props.products].sort((a, b) => {
      const filter = b.denomination.localeCompare(a.denomination);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByRef = () => (
    [...this.props.products].sort((a, b) => {
      const filter = b.reference.localeCompare(a.reference);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByDescription = () => (
    [...this.props.products].sort((a, b) => {
      const filter = b.description.localeCompare(a.description);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByPrice = () => (
    [...this.props.products].sort((a, b) => {
      const filter = (b.price - a.price);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByUnity = () => (
    [...this.props.products].sort((a, b) => {
      const filter = b.unity.localeCompare(a.unity);
      return this.state.filter.asc ? filter : -filter;
    })
  )

  order = () => {
    switch (this.state.filter.type) {
      case 'denomination':
        return this.orderByDenomination();
      case 'reference':
        return this.orderByRef();
      case 'description':
        return this.orderByDescription();
      case 'prix':
        return this.orderByPrice();
      case 'unite':
        return this.orderByUnity();
      case 'id':
        return this.orderById();
      default:
        return this.props.products;
    }
  }

  handleChevron = type => () => {
    const { type: stateType, asc } = this.state.filter;
    this.setState({
      filter: {
        type,
        asc: type === stateType ? !asc : false,
      },
    });
  }


  render() {
    return (
      <div className="page-container-product">
        <h1 className="titre titl-product">Vos produits</h1>
        <ButtonCreate class="product-create-button list-prod-btn" type="produit" />
        <div className="contain-products">
          <ProductItemHead clickChevron={this.handleChevron} />
          {this.getProductJSX()}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
  loadProducts: PropTypes.func.isRequired,
};

export default Home;
