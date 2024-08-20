import { DEFAULT_MODEL_CONFIG, ModelConfigs } from "@/api";
import { ModelConfig } from "@/api/types";
import { useCallback, useState } from "react";

export function useConfigurationManager(initialConfigs: ModelConfig[]) {
  const [configs, setConfigs] = useState<ModelConfig[]>(initialConfigs);
  const [selectedConfig, setSelectedConfig] = useState<ModelConfig | null>(
    DEFAULT_MODEL_CONFIG,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleConfigSelect = useCallback((config: ModelConfig) => {
    setSelectedConfig(config);
  }, []);

  const handleUpdateConfig = useCallback(
    (field: keyof ModelConfig, value: any) => {
      setSelectedConfig((prevConfig) => {
        if (!prevConfig) return prevConfig;

        return {
          ...prevConfig,
          [field]:
            field === "headers" ? { ...prevConfig.headers, ...value } : value,
        };
      });
      // Update the configs array as well
      setConfigs((prevConfigs) =>
        prevConfigs.map((config) =>
          config.modelId === selectedConfig?.modelId
            ? {
                ...config,
                [field]:
                  field === "headers" ? { ...config.headers, ...value } : value,
              }
            : config,
        ),
      );
    },
    [selectedConfig],
  );

  const handleAddConfig = useCallback(() => {
    const newConfig: ModelConfig = {
      modelId: `new-model-${Date.now()}`,
      displayName: "New Model",
      url: "",
      headers: {},
    };
    setConfigs((prevConfigs) => [...prevConfigs, newConfig]);
    setSelectedConfig(newConfig);
  }, []);

  const handleDeleteConfig = useCallback((configId: string) => {
    setConfigs((prevConfigs) =>
      prevConfigs.filter((config) => config.modelId !== configId),
    );

    // select nearest, existing, last element
    if (ModelConfigs.length) {
      const lastConfig = ModelConfigs.at(-1);
      if (lastConfig) {
        setSelectedConfig(lastConfig);
      }
    } else {
      setSelectedConfig(null);
    }
  }, []);

  return {
    configs,
    selectedConfig,
    searchTerm,
    setSearchTerm,
    handleConfigSelect,
    handleUpdateConfig,
    handleAddConfig,
    handleDeleteConfig,
  };
}
