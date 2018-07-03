import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '~/components/Dashboard';
import NavClick from '~/components/NavClick';
import Factures from '~/components/Factures';
import Produits from '~/components/Produits';

import './routes.scss';


const Routes = () => (
  <div className="page-container">
    {/* Le nav sera présent dans toutes nos pages */}
    <NavClick />
    <NavVertical />
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/invoices" component={Factures} />
      <Route path="/products" component={Produits} />
    </Switch>
  </div>
);

export default Routes;
