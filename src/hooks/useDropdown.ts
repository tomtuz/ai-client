import { useState } from 'react';

interface DropdownState {
  items: string[];
  selectedValue1: string;
  selectedValue2: string;
  setSelectedValue1: (value: string) => void;
  setSelectedValue2: (value: string) => void;
}

export function useDropdown(): DropdownState | null {
  const [items] = useState<string[]>(['item1', 'item2', 'open-router']);
  const [selectedValue1, setSelectedValue1] = useState<string>('');
  const [selectedValue2, setSelectedValue2] = useState<string>('');

  return {
    items,
    selectedValue1,
    selectedValue2,
    setSelectedValue1,
    setSelectedValue2,
  };
}
