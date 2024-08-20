import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@cn/ui";
import { useCallback, useState } from "react";

interface ModelSelectorProps {
  title?: string;
  optionArr: string[];
  updateHandler: (selectedOption: string) => void;
}

export function GenericSelector({
  title,
  optionArr,
  updateHandler,
}: Readonly<ModelSelectorProps>) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleApiChange = useCallback(
    (selectedOption: string) => {
      setSelectedOption(selectedOption);
      updateHandler(selectedOption);
    },
    [updateHandler],
  );

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <div className="content">
        <Select
          value={optionArr[0]}
          onValueChange={handleApiChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {optionArr.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
