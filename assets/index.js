import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '~/containers/App';
import store from '~/store';

// Ajout de l'élément virtuel dans le DOM du navigateur (mount/render).
// cible.appendChild(quoiajouter)
document.addEventListener('DOMContentLoaded', () => {
  const rootComponent = (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const targetNode = document.getElementById('root');
  render(rootComponent, targetNode);
});

