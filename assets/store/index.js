/**
 * Dépendances npm : utilitaire Redux
 */
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

/**
 * Dépendances locales : le reducer
 */
import dataMiddleware from './middlewares/data';
import modalMiddleware from './middlewares/modal';
import reducer from './reducers';

/**
 * Création du store
 */
// https://github.com/zalmoxisus/redux-devtools-extension

export const history = createBrowserHistory();
const devTools = [];
if (window.devToolsExtension) {
  // On configure l'extension Redux pour Chrome/Firefox.
  devTools.push(window.devToolsExtension());
}
const historyMiddleware = routerMiddleware(history);
const middleware = applyMiddleware(historyMiddleware, dataMiddleware, modalMiddleware);

const enhancers = compose(middleware, ...devTools);

const store = createStore(connectRouter(history)(reducer), enhancers);

export default store;
