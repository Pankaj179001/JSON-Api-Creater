"use client";
import { store } from "@/feature/Store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const LayoutProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default LayoutProviders;
