/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { createReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
  });

  return store;
}
