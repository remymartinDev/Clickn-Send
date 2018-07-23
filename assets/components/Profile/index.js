import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileContainer from '~/containers/Profile';
import EditProfile from './EditProfile';

const Profile = () => (
  <Switch>
    <Route path="/profile" exact component={ProfileContainer} />
    <Route path="/profile/edit" exact component={EditProfile} />
  </Switch>
);

export default Profile;
