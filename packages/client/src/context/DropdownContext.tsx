import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
  useCallback,
} from 'react';

interface DropdownContextType {
  items: string[];
  selectedValue1: string;
  selectedValue2: string;
  setSelectedValue1: (value: string) => void;
  setSelectedValue2: (value: string) => void;
  resetValues: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

interface DropdownProviderProps {
  children: ReactNode;
  items: string[];
  initialValue1?: string;
  initialValue2?: string;
}

export const DropdownProvider: React.FC<DropdownProviderProps> = ({
  children,
  items,
  initialValue1 = '',
  initialValue2 = '',
}) => {
  const [selectedValue1, setSelectedValue1] = useState<string>(initialValue1);
  const [selectedValue2, setSelectedValue2] = useState<string>(initialValue2);

  const resetValues = useCallback(() => {
    setSelectedValue1(initialValue1);
    setSelectedValue2(initialValue2);
  }, [initialValue1, initialValue2]);

  const dropdownData = useMemo(() => {
    return {
      items,
      selectedValue1,
      selectedValue2,
      setSelectedValue1,
      setSelectedValue2,
      resetValues,
    };
  }, [items, selectedValue1, selectedValue2, resetValues]);

  return (
    <DropdownContext.Provider value={dropdownData}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
