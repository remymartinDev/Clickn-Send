import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/containers/invoices/Home';
import Create from '~/containers/invoices/Create';
import Edit from './Edit';
import Modal from './componentsInvoices/Modal';
import InvoiceView from './View';
import AllInvoices from './AllInvoices';

const Facture = () => (
  <React.Fragment>
    <Switch>
      <Route path="/invoices/create" exact component={Create} />
      <Route path="/invoices/last" exact component={Home} />
      <Route path="/invoices" exact component={AllInvoices} />
      <Route path="/invoices/:id" exact component={InvoiceView} />
      <Route path="/invoices/:id/edit" exact component={Edit} />
      <Route render={() => (<div>404</div>)} />
    </Switch>
    <Modal />
  </React.Fragment>
);

export default Facture;
