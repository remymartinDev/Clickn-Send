import React from 'react';
import { Link } from 'react-router-dom';
import Plus from 'react-icons/lib/fa/plus';

import './dashboard.scss';

export default () => (
  <div className="contain-dash">
    <div className="dash-links">
      <Link to="/invoices/create" href="/invoice/create" className="dash-link fact">
        <button className="dash-btn">
          <Plus className="plus-btn plus-btn-fact" />
          <div className="dash-btn-text btn-fact">Créer une facture</div>
        </button>
      </Link>
      <Link to="/products/create" href="/products/create" className="dash-link prod">
        <button className="dash-btn">
          <Plus className="plus-btn plus-btn-prod" />
          <div className="dash-btn-text btn-prod">Créer un produit</div>
        </button>
      </Link>
      <Link to="/clients/create" href="/clients/create" className="dash-link cli">
        <button className="dash-btn">
          <Plus className="plus-btn plus-btn-cli" />
          <div className="dash-btn-text btn-cli">Créer un client</div>
        </button>
      </Link>
    </div>
  </div>
);
