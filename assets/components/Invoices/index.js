import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/containers/invoices/Home';
import Create from '~/containers/invoices/Create';
import Edit from './Edit';
import Modal from './componentsInvoices/Modal';

const Facture = () => (
  <React.Fragment>
    <Switch>
      <Route path="/invoices/create" exact component={Create} />
      <Route path="/invoices" exact component={Home} />
      <Route path="/invoices/:id" component={Edit} />
    </Switch>
    <Modal />
  </React.Fragment>
);

export default Facture;
