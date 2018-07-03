import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';

const Facture = () => (
  <Switch>
    <Route path="/invoices/create" exact component={Create} />
    <Route path="/invoices" render={() => (<div>Page des factures</div>)} />
  </Switch>
);

export default Facture;
