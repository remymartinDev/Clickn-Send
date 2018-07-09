import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';
import Home from './Home';
import Edit from './Edit';

const Produits = () => (
  <Switch>
    <Route path="/products/create" exact component={Create} />
    <Route path="/products" exact component={Home} />
    <Route path="/products/:id" component={Edit} />
  </Switch>
);

export default Produits;
