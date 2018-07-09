import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';
import Home from './Home';

const Clients = () => (
  <Switch>
    <Route path="/clients/create" exact component={Create} />
    <Route path="/clients" component={Home} />
  </Switch>
);

export default Clients;
