import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/Home';
import Routes from '~/components/Routes';
import Test from '~/components/Test';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    {/* On redirigie toutes les autre route vers le composant Routes */}
    <Route path="/test" component={Test} />
    <Route component={Routes} />
  </Switch>
);

export default App;
