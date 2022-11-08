import { createContext, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// as the actual value you want to access
// needed a null value for currentUser for the context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// storing the ACTION TYPES as a object so we can utilize dot notation to avoid human error
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

// initial state of the application
const INITIAL_STATE = {
  currentUser: null
}

// reducer gets called by dispatch
// make sure you pass in the reducer to the useReducer function along with the initial state
// action parameter is a object with the properties 'type' and 'payload'
const userReducer = (state, action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      throw new Error(`Unhandled type ${action.type} in userReducer`)
  }
}

// the actual component that you want to return
export const UserProvider = ({ children }) => {
  // needed a null value for currentUser for the state
  const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
  // get the currentUser from the state object
  const { currentUser } = state;

  const setCurrentUser = (user) => {
        // dispatch takes as a argument the 'ACTION OBJECT' with a type property and optional payload property
        // dispatch runs through the swtich conditional statment in the 'REDUCER FUNCTION'  and executes the code for its TYPE
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      // it's either going to be the user or null
      setCurrentUser(user)
    });

    return unsubscribe;
  }, []);

  /*The .Provider is the component that will wrap around any other component
   * that needs access to its values in it's context
   * the value is the actual contextual value that you are trying to store
   * this is the value that you are passing to the Provider
   */
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
