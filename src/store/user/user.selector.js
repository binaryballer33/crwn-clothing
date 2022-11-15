// this is referencing the key for state.user in the rootReducer
// then it goes into the key currentUser that we created in the userReducer
export const selectCurrentUser = (state) => state.user.currentUser;
