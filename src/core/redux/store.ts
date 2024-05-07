"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import nonPersistentStatesSlice from "./non-persistent-states/non-persistent-states.slice";
import persistentStatesSlice from "./persistent-states/persistent-states.slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nonPersistentStates"],
};

const rootReducer = combineReducers({
  nonPersistentStates: nonPersistentStatesSlice,
  persistentStates: persistentStatesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
