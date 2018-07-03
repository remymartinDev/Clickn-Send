import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/Home';
import NavVertical from '~/components/NavVertical';
import Routes from '~/components/Routes';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/test" exact component={NavVertical} />
    {/* On redirigie toutes les autre route vers le composant Routes */}
    <Route component={Routes} />
  </Switch>
);

export default App;
