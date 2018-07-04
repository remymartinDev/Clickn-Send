import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Plus from 'react-icons/lib/fa/plus';

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

const ButtonCreate = ({ type }) => {
  const { to, className, content } = typeList[type];
  return (
    <Link to={to} href={to} className={"dash-link " + className}>
      <button className="dash-btn">
        <Plus className={"plus-btn plus-btn-" + className} />
        <div className={"dash-btn-text btn-" + className}>{content}</div>
      </button>
    </Link>
  );
}


export default ButtonCreate;
