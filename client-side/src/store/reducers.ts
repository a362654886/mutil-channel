/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { AnyAction, Reducer, combineReducers } from "@reduxjs/toolkit";

import { InjectedReducersType } from "../types/injector-typings";
import { RootState } from "../types/RootState";
import { resetAction } from "./actions";

export function createReducer(
  injectedReducers: InjectedReducersType = {}
): Reducer {
  const reducer = combineReducers({
    ...injectedReducers,
  });

  // https://stackoverflow.com/questions/63592682/redux-toolkit-reseting-state
  const resettableReducer = (state: RootState, action: AnyAction) => {
    if (resetAction.match(action)) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };

  return resettableReducer;
}
