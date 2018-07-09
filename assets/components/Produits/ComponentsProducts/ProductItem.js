import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';

import './ProductItem.scss';

const ProductItem = ({
  denomination,
  reference,
  description,
  price,
  unity,
  id,
}) => {
  return (
    <div className="list-contain-product">
      <div className="list-item">{denomination}</div>
      <div className="list-item">{reference}</div>
      <div className="list-item">{description}</div>
      <div className="list-item">{price}</div>
      <div className="list-item">{unity}</div>
      <FaEye className="list-item--icon" />
      <FaPencil className="list-item--icon" />
      <FaDownload className="list-item--icon" />
    </div>
  );
};

ProductItem.propTypes = {
  denomination: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  unity: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ProductItem;
