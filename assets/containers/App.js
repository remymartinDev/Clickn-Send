/**
 * Dépendances npm : utilitaire React-Redux
 */
import { connect } from 'react-redux';

/**
 * Dépendances locales : le composant à connecter au store
 */
import App from '~/components/App';

/**
 * Connection du composant au store via connect()()
 */

const AppContainer = connect(
  null, // Props en lecture
  null, // Props en écriture
)(App);

export default AppContainer;
