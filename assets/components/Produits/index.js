import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';

const Produits = () => (
  <Switch>
    <Route path="/products/create" exact component={Create} />
    <Route path="/products" render={() => (<div>Page des produits</div>)} />
  </Switch>
);

export default Produits;
