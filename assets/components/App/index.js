import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '~/components/Home';
import Routes from '~/components/Routes';
import Test from '~/components/Test';

import '~/components/Forms/forms.scss';

class App extends React.Component {
  componentDidMount() {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log(user);
      this.props.login();
      this.props.userConnected(user);
    }
  }

  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            this.props.loggedIn ? (<Redirect to="/dashboard" />) : (<Home />)
          )}
        />
        {/* On redirigie toutes les autre route vers le composant Routes */}
        <Route path="/test" component={Test} />
        { this.props.loggedIn ? <Route component={Routes} /> : <Redirect to="/" />}
      </Switch>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  userConnected: PropTypes.func.isRequired,
};

export default App;
