/**
 * Dépendances npm : utilitaire React-Redux
 */
import { connect } from 'react-redux';

/**
 * Dépendances locales : le composant à connecter au store
 */
import App from '~/components/App';

import { loadAllData, loggedIn, loggedOut } from '~/store/reducers/dataActionCreator';
import { bindActionCreators } from 'redux';

/**
 * Connection du composant au store via connect()()
 */
const mapStateToProps = state => ({
  loggedIn: state.notreReducer.loggedIn,
  userConnected: state.notreReducer.userConnected,
});

const mapDispatchToProps = dispatch => ({
  // === loadAllData: () => { dispatch(loadAllData() ) }
  ...bindActionCreators({ loadAllData, loggedIn, loggedOut }, dispatch),
});

const AppContainer = connect(
  mapStateToProps, // Props en lecture
  mapDispatchToProps, // Props en écriture
  null,
  {
    pure: false,
  },
)(App);

export default AppContainer;
