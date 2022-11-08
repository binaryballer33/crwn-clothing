import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';

// root-reducer is the combination of all the reducers
export const rootReducer = combineReducers({
    user: userReducer,
})