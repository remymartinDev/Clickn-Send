import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '~/components/Dashboard';
import NavClick from '~/components/NavClick';


const Routes = () => (
  <React.Fragment>
    {/* Le nav sera présent dans toutes nos pages */}
    <NavClick />
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </React.Fragment>
);

export default Routes;
