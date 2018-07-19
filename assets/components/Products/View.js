import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './produits.scss';

class ProductView extends React.Component {

  state = {
    product: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/product/${id}`)
      .then(({ data }) => {
        this.setState({
          product: data,
        });
      });
  }

  render() {
    console.log(this.state.product);
    return (
      <div className="view">
        <h1 className="view-title">Vue de votre produit</h1>
        <Link to={`/products/${this.state.product.id}/edit`} className="view-link">
              <FontAwesomeIcon className="view-link-icon" icon={faPencilAlt} />
               Editer
        </Link>
        <div className="view-div">
          Dénomination
        </div>
        <div className="view-div">
          {this.state.product.denomination}
        </div>
        <div className="view-div">
          Référence
        </div>
        <div className="view-div">
          {this.state.product.reference}
        </div>
        <div className="view-div">
          Description
        </div>
        <div className="view-div">
          {this.state.product.description}
        </div>
        <div className="view-div">
          Prix
        </div>
        <div className="view-div">
          {this.state.product.price}
        </div>
        <div className="view-div">
          Unité
        </div>
        <div className="view-div">
          {this.state.product.unity}
        </div>

        
      </div>
    );
  }
}

ProductView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProductView;
