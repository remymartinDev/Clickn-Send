import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '~/components/Dashboard';
import NavClick from '~/components/NavClick';
import Factures from '~/components/Factures';

import './routes.scss';

const Routes = () => (
  <div className="page-container">
    {/* Le nav sera présent dans toutes nos pages */}
    <NavClick />
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/invoice" component={Factures} />
    </Switch>
  </div>
);

export default Routes;
