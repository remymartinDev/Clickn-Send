import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';
import FaTrash from 'react-icons/lib/fa/trash';

import './ProductItem.scss';

const ProductItem = ({
  denomination,
  reference,
  description,
  price,
  unity,
  id,
  clickDelete,
}) => (
  <div className="list-contain-product">
    <div className="list-item">{denomination}</div>
    <div className="list-item">{reference}</div>
    <Media query="(min-width: 769px)" >
      {matches => (matches && <div className="list-item">{description}</div>)}
    </Media>
    <div className="list-item">{price}</div>
    <Media query="(min-width: 769px)" >
      {matches => (matches && <div className="list-item">{unity}</div>)}
    </Media>
    <FaEye className="list-item--icon" />
    <Link to={`/products/${id}`} className="list-item--icon"> <FaPencil /> </Link>
    <FaDownload className="list-item--icon" />
    <FaTrash 
      className="list-item--icon"
      onClick={clickDelete(id)}
    />
  </div>
);

ProductItem.propTypes = {
  denomination: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  unity: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  clickDelete: PropTypes.func.isRequired,
};

export default ProductItem;
