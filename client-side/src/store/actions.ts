import { createAction } from '@reduxjs/toolkit';

// for logout reset root state, custom reset action
// https://stackoverflow.com/questions/63592682/redux-toolkit-reseting-state
export const resetAction = createAction('reset');
