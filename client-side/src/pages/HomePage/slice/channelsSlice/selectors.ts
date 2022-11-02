import { createSelector } from "@reduxjs/toolkit";
import { initialState } from ".";
import { RootState } from "../../../../types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.channels || initialState;

export const selectChannels = createSelector([selectDomain], (channels) => channels);
