import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ButtonCreate from '~/components/ButtonCreate';
import ProductItem from './ComponentsProducts/ProductItem';
import ProductItemHead from './ComponentsProducts/ProductItemHead';

import './produits.scss';

class Home extends React.Component {
  state = {
    // products: [],
    filter: {
      type: 'id',
      asc: false,
    }
  }

  // componentDidMount() {
  //   axios.get('/api/products')
  //     .then(({ data: products }) => {
  //       this.setState({
  //         products,
  //       });
  //     });
  // }

  getProductJSX = () => {
    const orderedProducts = [...this.props.products].sort((a, b) => {
      const filter = b.id - a.id;
      return this.state.filter.asc ? filter : -filter;
    });
    const productsJsx = orderedProducts.map(product => (
      <ProductItem key={product.id} {...product} clickDelete={this.handleDelete} />
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

  orderByDenomination = products => (
    [...products].sort((a, b) => {
      const filter = (b.denomination - a.denomination);
      return this.state.filer.asc ? filter : -filter;
    })
  )
  orderByRef = products => (
    [...products].sort((a, b) => {
      const filter = (b.reference - a.reference);
      return this.state.filer.asc ? filter : -filter;
    })
  )
  orderByDescription = products => (
    [...products].sort((a, b) => {
      const filter = (b.description - a.description);
      return this.state.filer.asc ? filter : -filter;
    })
  )
  orderByPrice = products => (
    [...products].sort((a, b) => {
      const filter = (b.price - a.price);
      return this.state.filer.asc ? filter : -filter;
    })
  )
  orderByUnity = products => (
    [...products].sort((a, b) => {
      const filter = (b.unity - a.unity);
      return this.state.filer.asc ? filter : -filter;
    })
  )

  order = (products, type) => {
    switch (type) {
      case 'denomination':
        return this.orderByDenomination(products);
      case 'reference':
        return this.orderByRef(products);
      case 'description':
        return this.orderByDescription(products);
      case 'prix':
        return this.orderByPrice(products);
      case 'unite':
        return this.orderByUnity(products);
      default:
        return products;
    }
  }

  handleDelete = id => () => {
    axios.delete('/api/product/'+id)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const products = this.props.products.filter(({ id: productId }) => id !== productId );
          this.setState({
            products,
          });
        }
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
};

export default Home;
