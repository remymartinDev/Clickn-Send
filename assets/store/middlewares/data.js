import { ajaxGet, ajaxDelete, ajaxCreate } from '~/components/utils/ajax';
import axios from 'axios';
import {
  LOAD_CUSTOMERS,
  LOAD_INVOICES,
  LOAD_STATUS,
  LOAD_PRODUCTS,
  LOAD_ALL_DATA,
  DELETE_CUSTOMER,
  CREATE_INVOICE,
  CREATE_CUSTOMER,
  CREATE_PRODUCT,
  CREATE_COMPANY,
} from '~/store/reducers/dataActions';
import {
  loadCustomers,
  loadInvoices,
  loadStatus,
  loadProducts,
} from '~/store/reducers/dataActionCreator';
import { LOGGED_OUT } from '~/store/reducers/localActions';
import { loggedOut, loggedIn, userConnected } from '../reducers/localActionCreator';

const getDataCreator = (next, action) => async (url) => {
  const { data } = await ajaxGet(url);
  next({
    ...action,
    data,
  });
};

const deleteDataCreator = (next, action) => async (url) => {
  const { data } = await ajaxDelete(`${url}/${action.id}`);
  console.log(data);
};

const createDataCreator = (next, action) => async (url) => {
  console.log(action);
  const { data } = await ajaxCreate(url, action.values);
  console.log(data);
  if (data.succes) {
    next({
      ...action,
      id: data.id,
    });
  }
};

const dataMiddleware = store => next => (action) => {
  const getData = getDataCreator(next, action);
  const deleteData = deleteDataCreator(next, action);
  const createData = createDataCreator(next, action);

  switch (action.type) {
    case LOAD_ALL_DATA: {
      store.dispatch(loadCustomers());
      store.dispatch(loadInvoices());
      store.dispatch(loadStatus());
      store.dispatch(loadProducts());
      break;
    }
    case LOAD_CUSTOMERS: {
      getData('/api/customers');
      break;
    }
    case LOAD_PRODUCTS: {
      getData('/api/products');
      break;
    }
    case LOAD_STATUS: {
      getData('/api/status');
      break;
    }
    case LOAD_INVOICES: {
      getData('/api/invoices');
      break;
    }
    case DELETE_CUSTOMER: {
      deleteData('/api/customer');
      break;
    }
    case CREATE_INVOICE: {
      createData('/api/invoice/new');
      break;
    }
    case CREATE_CUSTOMER: {
      createData('/api/customer/new');
      break;
    }
    case CREATE_PRODUCT: {
      createData('/api/product/new');
      break;
    }
    case CREATE_COMPANY: {
      axios.post('api/company/new', action.values)
        .then((response) => {
          if (response.data.succes) {
            console.log(action.values);
            const values = {
              username: action.values._username,
              password: action.values._password,
            };
            axios.post('/login', values)
              .then((responseLogin) => {
                store.dispatch(loggedIn());
                store.dispatch(userConnected(responseLogin.data.user));
              });
          }
        });
      break;
    }
    case LOGGED_OUT: {
      axios.get('/logout')
        .then((response) => {
          console.log(response);
          sessionStorage.removeItem('user');
          next(action);
        });
      break;
    }
    default:
      next(action);
  }
};

export default dataMiddleware;
