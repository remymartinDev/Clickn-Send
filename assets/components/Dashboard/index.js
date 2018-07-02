import React from 'react';
import { Link } from 'react-router-dom';
// import { Plus } from 'react-icons';

import NavClick from '~/components/NavClick';

export default () => (
  <div>
    <NavClick />
    <Link to="/invoice" href="/invoice" className="dash-link">
        <img src={Plus} />
        <button className="dash-button">Créer une facture</button>
    </Link>
  </div>
);
