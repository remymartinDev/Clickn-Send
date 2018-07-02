/**
 * État initial pour le state de l'application
 */
const initialState = {};

/**
 * Reducer de l'application
 */
const reducer = (currentState = initialState, action = {}) => {
  switch (action.type) {
    case 'GENERATE_RANDOM_VALUE':
      return {
        ...currentState,
        value: action.value,
      };

    default: return currentState;
  }
};

export default reducer;
