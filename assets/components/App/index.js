import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/Home';
import Dashboard from '~/components/Dashboard';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default App;
