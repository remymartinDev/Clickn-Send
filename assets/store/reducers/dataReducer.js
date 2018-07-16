import {
  LOAD_CUSTOMERS,
  LOAD_PRODUCTS,
  LOAD_STATUS,
  LOAD_INVOICES,
  ADD_CUSTOMER,
  ADD_PRODUCT,
  CREATE_COMPANY,
} from './dataActions';

const initialState = {
  customers: [],
  products: [],
  status: [],
  invoices: [],
};

const reducer = (currentState = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      return {
        ...currentState,
        customers: action.data,
      };
    }

    case LOAD_PRODUCTS: {
      return {
        ...currentState,
        products: action.data,
      };
    }

    case LOAD_STATUS: {
      return {
        ...currentState,
        status: action.data,
      };
    }

    case LOAD_INVOICES: {
      return {
        ...currentState,
        invoices: action.data,
      };
    }

    case ADD_CUSTOMER: {
      return {
        ...currentState,
        customers: [...currentState.customers, action.customer],
      };
    }

    case ADD_PRODUCT: {
      return {
        ...currentState,
        products: [...currentState.products, action.product],
      };
    }

    default: return currentState;
  }
};


export default reducer;
