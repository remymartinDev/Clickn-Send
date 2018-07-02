import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/Home';

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" render={() => (<div>dashboard</div>)} />
    </Switch>
  </div>
);

export default App;
