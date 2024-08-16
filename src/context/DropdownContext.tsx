import React, { createContext, useState, ReactNode, useMemo } from "react";
import { Item } from "@/types/chat";

interface DropdownContextType {
  items: Item[];
  selectedValue1: string;
  selectedValue2: string;
  setSelectedValue1: (value: string) => void;
  setSelectedValue2: (value: string) => void;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export const DropdownProvider: React.FC<{
  children: ReactNode;
  items: Item[];
}> = ({ children, items }) => {
  const [selectedValue1, setSelectedValue1] = useState<string>("");
  const [selectedValue2, setSelectedValue2] = useState<string>("");

  const dropdownData = useMemo(() => {
    return {
      items,
      selectedValue1,
      selectedValue2,
      setSelectedValue1,
      setSelectedValue2,
    };
  }, [items, selectedValue1, selectedValue2]);

  return (
    <DropdownContext.Provider value={dropdownData}>
      {children}
    </DropdownContext.Provider>
  );
};
