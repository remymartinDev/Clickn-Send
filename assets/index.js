import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConnectedRouter } from 'connected-react-router';

import App from '~/containers/App';
import store, { history } from '~/store';

// Ajout de l'élément virtuel dans le DOM du navigateur (mount/render).
// cible.appendChild(quoiajouter)
addLocaleData([...fr]);
document.addEventListener('DOMContentLoaded', () => {
  const rootComponent = (
    <Provider store={store}>
      <IntlProvider locale="fr">
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  );
  const targetNode = document.getElementById('root');
  render(rootComponent, targetNode);
});

