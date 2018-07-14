/**
 * État initial pour le state de l'application
 */
const initialState = {
  data: {},
};

/**
 * Reducer de l'application
 */
const reducer = (currentState = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD': {
      return {
        data: action.data,
      };
    }
    default: return currentState;
  }
};

export default reducer;
