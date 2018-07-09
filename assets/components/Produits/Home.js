import React from 'react';
import axios from 'axios';

import ButtonCreate from '~/components/ButtonCreate';
import ProductItem from './ComponentsProducts/ProductItem';
import ProductItemHead from './ComponentsProducts/ProductItemHead';

import './produits.scss';

class Home extends React.Component {
  state = {
    products: [],
    filter: {
      type: 'id',
      asc: false,
    }
  }

  componentDidMount() {
    axios.get('/api/products')
      .then(({ data: products }) => {
        this.setState({
          products,
        });
      });
  }

  getProductJSX = () => {
    const orderedProducts = [...this.state.products].sort((a, b) => {
      const filter = b.id - a.id;
      return this.state.filter.asc ? filter : -filter;
    });
    const productsJsx = orderedProducts.map(product => (
      <ProductItem key={product.id} {...product} />
    ));
    return productsJsx;
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

export default Home;
