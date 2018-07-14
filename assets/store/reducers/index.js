import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import notreReducer from './notreReducer';
import data from './dataReducer';

const rootReducer = combineReducers({
  form: formReducer,
  notreReducer,
  data,
});

export default rootReducer;
