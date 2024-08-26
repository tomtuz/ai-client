import { openRouterModels } from '@/constants/index.ts';
import { useDropdown } from '@/hooks/useDropdown.ts';
import React from 'react';
import { GenericDropdown } from './GenericDropdown.tsx';

interface DropdownState {
  items: string[];
  selectedValue1: string;
  selectedValue2: string;
  setSelectedValue1: (value: string) => void;
  setSelectedValue2: (value: string) => void;
}

export const DropdownContainer: React.FC = () => {
  const dropdownState = useDropdown();

  if (!dropdownState) {
    return null; // or some loading indicator
  }

  const {
    items,
    selectedValue1,
    selectedValue2,
    setSelectedValue1,
    setSelectedValue2,
  } = dropdownState as DropdownState;

  const options = [...items];
  const openRouterOptions = Object.keys(openRouterModels);

  return (
    <div className="space-y-4">
      <GenericDropdown
        options={options}
        value={selectedValue1}
        onChange={setSelectedValue1}
        placeholder="Select Value 1"
      />
      {selectedValue1 === 'open-router' && (
        <GenericDropdown
          options={openRouterOptions}
          value={selectedValue2}
          onChange={setSelectedValue2}
          placeholder="Select Value 2"
        />
      )}
    </div>
  );
};
