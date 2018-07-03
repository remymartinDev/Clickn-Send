import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';

const Clients = () => (
  <Switch>
    <Route path="/clients/create" exact component={Create} />
    <Route path="/clients" render={() => (<div>Page des clients</div>)} />
  </Switch>
);

export default Clients;
