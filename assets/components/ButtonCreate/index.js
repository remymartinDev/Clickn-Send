import React from 'react';
<<<<<<< HEAD
=======
import PropTypes from 'prop-types';
>>>>>>> 2f76fd8adb485b1a0b338a52a75a5684f3b50b5f
import { Link } from 'react-router-dom';
import Plus from 'react-icons/lib/fa/plus';
import PropTypes from 'prop-types';

import './ButtonCreate.scss';

const typeList = {
  facture: {
    to: '/invoices/create',
    className: 'fact',
    content: 'Créer une facture',
  },
  client: {
    to: '/clients/create',
    className: 'cli',
    content: 'Créer un client',
  },
  produit: {
    to: '/products/create',
    className: 'prod',
    content: 'Créer un produit',
  },
};

const ButtonCreate = ({ type, class: classFact }) => {
  const { to, className, content } = typeList[type];
  return (
<<<<<<< HEAD
    <Link to={to} href={to} className={`dash-link ${className} ${classFact}`}>
=======
    <Link to={to} href={to} className={`dash-link ${className}`}>
>>>>>>> 2f76fd8adb485b1a0b338a52a75a5684f3b50b5f
      <button className="dash-btn">
        <Plus className={`plus-btn plus-btn-${className}`} />
        <div className={`dash-btn-text btn-${className}`}>{content}</div>
      </button>
    </Link>
  );
};
<<<<<<< HEAD

ButtonCreate.propTypes = {
  type: PropTypes.string.isRequired,
  class: PropTypes.string,
};

ButtonCreate.defaultProps = {
  class: '',
=======

ButtonCreate.propTypes = {
  type: PropTypes.string.isRequired,
>>>>>>> 2f76fd8adb485b1a0b338a52a75a5684f3b50b5f
};

export default ButtonCreate;
