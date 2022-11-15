import USER_ACTION_TYPES from "./user.types";

// initial state of the application
export const USER_INITIAL_STATE = {
  currentUser: null,
};

// reducer gets called by dispatch
// make sure you pass in the reducer to the useReducer function along with the initial state
// action parameter is a object with the properties 'type' and 'payload'
export const userReducer = (state = USER_ACTION_TYPES, action = {}) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
  
};
