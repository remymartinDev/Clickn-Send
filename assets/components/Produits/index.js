import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';
import Home from './Home';

const Produits = () => (
  <Switch>
    <Route path="/products/create" exact component={Create} />
    <Route path="/products" component={Home} />
  </Switch>
);

export default Produits;
