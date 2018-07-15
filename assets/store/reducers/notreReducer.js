import { CLOSE_MODAL, OPEN_MODAL } from './localActions';
/**
 * État initial pour le state de l'application
 */
const initialState = {
  data: {},
  modal: false,
  view: '',
  field: '',
};

/**
 * Reducer de l'application
 */
const reducer = (currentState = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD': {
      return {
        ...currentState,
        data: action.data,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...currentState,
        modal: false,
        view: '',
        field: '',
      };
    }

    case OPEN_MODAL: {
      return {
        ...currentState,
        modal: true,
        view: action.view,
        field: action.field,
      };
    }
    default: return currentState;
  }
};

export default reducer;
