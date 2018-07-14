import axios from 'axios';

import { LOAD_CUSTOMERS } from '~/store/reducers/dataReducer';

const data = store => next => (action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      axios.get('/api/customers')
        .then((response) => {
          next({
            ...action,
            data: response.data,
          });
        });
      break;
    }
    default:
      next(action);
  }
};


export default data;
