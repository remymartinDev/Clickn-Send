import React from 'react';
import { Link } from 'react-router-dom';

import NavClick from '~/components/NavClick';

export default () => (
  <div>
    <NavClick />
    <Link to="/invoice" href="/invoice" className="dash-link">
        <img  />
        <button className="dash-button">Créer une facture</button>
    </Link>
  </div>
);
