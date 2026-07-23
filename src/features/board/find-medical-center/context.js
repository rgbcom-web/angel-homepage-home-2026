"use client";

import { createContext, use, useEffect, useState } from "react";

const FindMedicalCenterContext = createContext();

export function FindMedicalCenterProvider({ children, list }) {
  const [selectedItem, setSelectedItem] = useState(list[0]);

  useEffect(() => {
    if (list.length > 0) {
      setSelectedItem(list[0]);
    }
  }, [list]);

  return (
    <FindMedicalCenterContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </FindMedicalCenterContext.Provider>
  );
}

export function useFindMedicalCenter() {
  return use(FindMedicalCenterContext);
}
