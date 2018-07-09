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
      type: 'date',
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
    orderedProducts.map(product => (
      <ProductItem key={product.id} {...product} />
    ));
    return orderedProducts;
  }

  render() {
    return (
      <div className="page-container-product">
        <ButtonCreate class="product-create-button" type="produit" />
        <ProductItemHead />
        {this.getProductJSX()}
      </div>
    );
  }
}

export default Home;
