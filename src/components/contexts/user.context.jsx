import { createContext, useState } from "react";

// as the actual value you want to access
// needed a null value for currentUser for the context
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// the actual component that you want to return
export const UserProvider = ({ children }) => {
    // needed a null value for currentUser for the state
    const [currentUser, setCurrentUser] = useState(null);
    const value  = { currentUser, setCurrentUser };

    /*The .Provider is the component that will wrap around any other component
    * that needs access to its values in it's context
    * the value is the actual contextual value that you are trying to store
    * this is the value that you are passing to the Provider 
    */
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
