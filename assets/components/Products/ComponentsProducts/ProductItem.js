import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import FaTrash from 'react-icons/lib/fa/trash';

import DropdownButton from '~/components/utils/DropdownButton';
import './ProductItem.scss';


const ProductItem = ({ product }) => {
  const {
    denomination,
    reference,
    description,
    price,
    unity,
    id,
    active,
  } = product;

  const divClass = (!active) ? 'disable' : '';
  return (
    <div className={`list-contain-product ${divClass}`}>
      <div className="list-item">{denomination}</div>
      <div className="list-item">{reference}</div>
      <Media query="(min-width: 769px)" >
        {matches => (matches && <div className="list-item">{description}</div>)}
      </Media>
      <div className="list-item">{price}</div>
      <Media query="(min-width: 769px)" >
        {matches => (matches && <div className="list-item">{unity}</div>)}
      </Media>
      <DropdownButton componentObject={product} componentType="product" id={id} />
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
