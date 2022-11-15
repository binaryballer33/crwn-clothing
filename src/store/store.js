import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";
// import { loggerMiddleware } from "./middleware/logger";

import { rootReducer } from "./root-reducers";

// after importing storage from redux-persist/lib/storage
// use storage for the value for the storage key. storage uses localStorage by default
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// .filter(Boolean) filters out anything that is not true
// doing this because we don't want to pass false into the middleware
// if you want to hide the logs you can change the string to production
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

// code needed to setup redux dev tools
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
