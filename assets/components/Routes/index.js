import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Media from 'react-media';

import Dashboard from '~/components/Dashboard';
import Login from '~/components/Login';
import Signin from '~/components/Signin';
import NavClick from '~/components/NavClick';
import NavVertical from '~/components/NavVertical';
import Factures from '~/components/Invoices';
import Products from '~/components/Products';
import Customers from '~/components/Customers';
import Profile from '~/components/Profile';
import Contact from '~/components/Contact';

import './routes.scss';


const Routes = () => (
  <div className="page-container">
    {/* Le nav sera présent dans toutes nos pages */}
    <Media query="(min-width: 769px)">
      { matches => (matches ? <NavVertical /> : <NavClick />) }
    </Media>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/signin" component={Signin} />
      <Route path="/invoices" component={Factures} />
      <Route path="/products" component={Products} />
      <Route path="/customers" component={Customers} />
      <Route path="/profile" component={Profile} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </div>
);

export default Routes;
