import { useState, useCallback } from "react";
import { configureApi } from "@/services/api";
import {
  ModelConfigs,
  DEFAULT_MODEL_CONFIG,
  getModelConfigById,
} from "@/utils/apiConfigs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@cn/ui";

interface ModelSelectorProps {
  title?: string;
}

export function ModelSelector({
  title = "Select AI Model",
}: Readonly<ModelSelectorProps>) {
  const [selectedApi, setSelectedApi] = useState<string>(() => {
    configureApi(DEFAULT_MODEL_CONFIG);
    return DEFAULT_MODEL_CONFIG.id;
  });

  const handleApiChange = useCallback((configId: string) => {
    const selectedModel = getModelConfigById(configId);
    if (selectedModel) {
      setSelectedApi(selectedModel.id);
      configureApi(selectedModel);
    } else {
      console.error(`No configuration found for id: ${configId}`);
    }
  }, []);

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <div className="content">
        <Select
          value={selectedApi}
          onValueChange={handleApiChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {ModelConfigs.map((model) => (
                <SelectItem
                  key={model.id}
                  value={model.id}
                >
                  {model.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
