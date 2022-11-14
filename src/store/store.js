import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage  from "redux-persist/lib/storage";

// import logger from "redux-logger";

import { rootReducer } from "./root-reducers";

// creating a middleware logger
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// after importing storage from redux-persist/lib/storage
// use storage for the value for the storage key. storage uses localStorage by default
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
