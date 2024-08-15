import React, { createContext, useState, useContext, ReactNode } from "react";
import { Item } from "@/types/chat";

interface DropdownContextType {
  items: Item[];
  selectedValue1: string;
  selectedValue2: string;
  setSelectedValue1: (value: string) => void;
  setSelectedValue2: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export const DropdownProvider: React.FC<{
  children: ReactNode;
  items: Item[];
}> = ({ children, items }) => {
  const [selectedValue1, setSelectedValue1] = useState<string>("");
  const [selectedValue2, setSelectedValue2] = useState<string>("");

  return (
    <DropdownContext.Provider
      value={{
        items,
        selectedValue1,
        selectedValue2,
        setSelectedValue1,
        setSelectedValue2,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
