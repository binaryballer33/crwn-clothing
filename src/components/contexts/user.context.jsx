import { createContext, useState, useEffect } from "react";

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

// the actual component that you want to return
export const UserProvider = ({ children }) => {
  // needed a null value for currentUser for the state
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      // it's either going to be the user or null
      setCurrentUser(user);
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
