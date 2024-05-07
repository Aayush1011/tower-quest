import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const persistentStates = (state: RootState) => state.persistentStates;

export const selectPersistentStates = createSelector(
  persistentStates,
  (state) => state,
);
