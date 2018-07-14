import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Profile = () => (
  <Switch>
    <Route path="/profile" render={() => (<div>Page du profile</div>)} />
  </Switch>
);

export default Profile;
