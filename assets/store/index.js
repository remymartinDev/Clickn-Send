/**
 * Dépendances npm : utilitaire Redux
 */
import { createStore, compose, applyMiddleware } from 'redux';

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
const devTools = [];
if (window.devToolsExtension) {
  // On configure l'extension Redux pour Chrome/Firefox.
  devTools.push(window.devToolsExtension());
}
const middleware = applyMiddleware(dataMiddleware, modalMiddleware);

const enhancers = compose(middleware, ...devTools);

const store = createStore(reducer, enhancers);

export default store;
