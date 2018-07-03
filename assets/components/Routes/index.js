import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '~/components/Dashboard';

const Routes = () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
