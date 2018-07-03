import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '~/components/Dashboard';
import NavClick from '~/components/NavClick';
import Factures from '~/components/Factures';
import Produits from '~/components/Produits';
import Clients from '~/components/Clients';

import './routes.scss';

const Routes = () => (
  <div className="page-container">
    {/* Le nav sera présent dans toutes nos pages */}
    <NavClick />
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/invoices" component={Factures} />
      <Route path="/products" component={Produits} />
      <Route path="/clients" component={Clients} />
    </Switch>
  </div>
);

export default Routes;
