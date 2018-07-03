import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/Home';
import Routes from '~/components/Routes';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route component={Routes} />
  </Switch>
);

export default App;
