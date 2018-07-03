import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';

const Facture = () => (
  <Switch>
    <Route path="/invoice/create" exact component={Create} />
    <Route path="/invoice" render={() => (<div>Page des factures</div>)} />
  </Switch>
);

export default Facture;
