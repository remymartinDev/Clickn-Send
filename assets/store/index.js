/**
 * Dépendances npm : utilitaire Redux
 */
import { createStore, compose, applyMiddleware } from 'redux';

/**
 * Dépendances locales : le reducer
 */
import reducer from './reducer';
import preventDuplicates from './middlewares/preventDuplicates';

/**
 * Création du store
 */
// https://github.com/zalmoxisus/redux-devtools-extension
const devTools = []
if (window.devToolsExtension) {
  // On configure l'extension Redux pour Chrome/Firefox.
  devTools.push(window.devToolsExtension());
}

const preventDuplicatesMW = applyMiddleware(preventDuplicates);

const enhancers = compose(preventDuplicatesMW, ...devTools);

const store = createStore(reducer, enhancers);

export default store;
