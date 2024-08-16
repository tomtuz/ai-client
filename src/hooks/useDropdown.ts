import { DropdownContext } from "@/context/DropdownContext";
import { useContext } from "react";

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
