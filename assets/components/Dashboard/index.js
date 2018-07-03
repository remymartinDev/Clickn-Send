import React from 'react';
import { Link } from 'react-router-dom';
import Plus from 'react-icons/lib/fa/plus';

import NavClick from '~/components/NavClick';
import './dashboard.scss';

export default () => (
  <div>
    <NavClick />
    <div className="dash-links">
      <Link to="/invoice" href="/invoice" className="dash-link fact">
        <Plus className="plus-btn plus-btn-fact" />
        <button className="dash-button btn-fact">Créer une facture</button>
      </Link>
      <Link to="/product" href="/product" className="dash-link prod">
        <Plus className="plus-btn plus-btn-prod" />
        <button className="dash-button btn-prod">Créer un produit</button>
      </Link>
      <Link to="/client" href="/client" className="dash-link cli">
        <Plus className="plus-btn plus-btn-cli" />
        <button className="dash-button btn-cli">Créer un service</button>
      </Link>
    </div>
  </div>
);
