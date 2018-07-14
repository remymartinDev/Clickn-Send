/**
 * Dépendances npm : utilitaire Redux
 */
import { createStore, compose, applyMiddleware } from 'redux';

/**
 * Dépendances locales : le reducer
 */
import data from './middlewares/data';
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
const dataMiddleware = applyMiddleware(data);
const enhancers = compose(dataMiddleware, ...devTools);

const store = createStore(reducer, enhancers);

export default store;
