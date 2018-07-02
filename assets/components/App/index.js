import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/Home';

class App extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" render={() => (<div>dashboard</div>)} />
        </Switch>
      </div>
    );
  }
}

export default App;
