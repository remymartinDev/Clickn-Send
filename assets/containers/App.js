/**
 * Dépendances npm : utilitaire React-Redux
 */
import { connect } from 'react-redux';

/**
 * Dépendances locales : le composant à connecter au store
 */
import App from '~/components/App';

import { loadAllData } from '~/store/reducers/dataActionCreator';
import { bindActionCreators } from 'redux';

/**
 * Connection du composant au store via connect()()
 */
const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  // === loadAllData: () => { dispatch(loadAllData() ) }
  ...bindActionCreators({ loadAllData }, dispatch),
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
