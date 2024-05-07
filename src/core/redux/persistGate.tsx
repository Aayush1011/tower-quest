"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { ReactNode } from "react";

export const PersistGates = ({ children }: { children: ReactNode }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
