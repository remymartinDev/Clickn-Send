import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/containers/invoices/Home';
import Create from '~/containers/invoices/Create';

const Facture = () => (
  <Switch>
    <Route path="/invoices/create" exact component={Create} />
    <Route path="/invoices" component={Home} />
  </Switch>
);

export default Facture;
