import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import notreReducer from './notreReducer';

const rootReducer = combineReducers({
  form: formReducer,
  notreReducer,
});

export default rootReducer;
