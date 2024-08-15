import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cn/ui";

interface GenericDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const GenericDropdown: React.FC<GenericDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
