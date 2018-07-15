import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Contact = () => (
  <Switch>
    <Route path="/contact" render={() => (<div>Page de contact</div>)} />
  </Switch>
);

export default Contact;
