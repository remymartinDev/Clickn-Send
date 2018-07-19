import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '~/containers/products/Home';
import Create from './Create';
import Edit from './Edit';
import ProductView from './View';

const Produits = () => (
  <Switch>
    <Route path="/products/create" exact component={Create} />
    <Route path="/products" exact component={Home} />
    <Route path="/products/:id" exact component={ProductView} />
    <Route path="/products/:id/edit" exact component={Edit} />
  </Switch>
);

export default Produits;
