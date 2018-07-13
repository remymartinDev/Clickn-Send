const initialState = {
  customers: [],
};

export const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';

const reducer = (currentState = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      return {
        ...currentState,
        customers: action.data,
      };
    }
    default: return currentState;
  }
};

export const loadCustomers = () => ({
  type: 'LOAD_CUSTOMERS',
});

export default reducer;
