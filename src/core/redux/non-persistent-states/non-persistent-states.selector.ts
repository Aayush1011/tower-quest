import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const nonPersistentStates = (state: RootState) =>
  state.nonPersistentStates;

export const selectNonPersistentStates = createSelector(
  nonPersistentStates,
  (state) => state,
);
