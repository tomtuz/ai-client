import { DEFAULT_MODEL_CONFIG } from '@/api';
import { setApiConfig } from '@/services/api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@cn/ui';
import { useState } from 'react';

interface ModelSelectorProps {
  title?: string;
}

export function ModelSelector({
  title = 'Select AI Model',
}: Readonly<ModelSelectorProps>) {
  const [selectedApi, setSelectedApi] = useState<string>(() => {
    setApiConfig(DEFAULT_MODEL_CONFIG);
    return DEFAULT_MODEL_CONFIG.id;
  });

  // const handleApiChange = useCallback((configId: string) => {
  //   // const selectedModel = getModelConfigById(configId);
  //   if (selectedModel) {
  //     setSelectedApi(selectedModel.id);
  //     setApiConfig(selectedModel);
  //   } else {
  //     console.error(`No configuration found for id: ${configId}`);
  //   }
  // }, []);

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <div className="content">
        <Select
          value={selectedApi}
          // onValueChange={handleApiChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {/* {apiConfigs.map((model) => (
                <SelectItem
                  key={model.id}
                  value={model.id}
                >
                  {model.name}
                </SelectItem>
              ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
