import React from "react";
import { useDropdown } from "@/context/DropdownContext";
import { GenericDropdown } from "./GenericDropdown.tsx";

export const DropdownContainer: React.FC = () => {
  const {
    items,
    selectedValue1,
    selectedValue2,
    setSelectedValue1,
    setSelectedValue2,
  } = useDropdown();
  const options = items.map((item) => item.id);

  return (
    <div className="space-y-4">
      <GenericDropdown
        options={options}
        value={selectedValue1}
        onChange={setSelectedValue1}
        placeholder="Select Value 1"
      />
      <GenericDropdown
        options={options}
        value={selectedValue2}
        onChange={setSelectedValue2}
        placeholder="Select Value 2"
      />
    </div>
  );
};
