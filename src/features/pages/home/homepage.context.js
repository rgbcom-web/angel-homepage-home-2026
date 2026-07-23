"use client";

import { createContext, useContext, useState } from "react";

const MainPageContext = createContext();

export function MainPageProvider({ children }) {
  const [introEnd, setIntroEnd] = useState(false);

  return (
    <MainPageContext.Provider value={{ introEnd, setIntroEnd }}>
      {children}
    </MainPageContext.Provider>
  );
}

export function useMainPageContext() {
  return useContext(MainPageContext);
}
