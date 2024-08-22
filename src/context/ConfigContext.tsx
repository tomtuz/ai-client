import { ModelConfigs } from "@/api";
import { ModelConfig } from "@/api/types";
import { ConfigurationManager } from "@/hooks/ConfigurationManager";
import { loadConfigurations } from "@/utils/configLoader";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ConfigurationContextType {
  configManager: ConfigurationManager;
  activeConfig: ModelConfig | null;
  setActiveConfig: (id: string) => void;
  isLoading: boolean;
}

const ConfigurationContext = createContext<ConfigurationContextType>({
  configManager: new ConfigurationManager([]),
  activeConfig: null,
  setActiveConfig: () => {},
  isLoading: true,
});

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [configManager, setConfigManager] = useState(
    () => new ConfigurationManager(ModelConfigs),
  );
  const [activeConfig, setActiveConfig] = useState<ModelConfig | null>(
    ModelConfigs[0] || null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeConfigs() {
      try {
        const loadedConfigs = await loadConfigurations();
        if (loadedConfigs.length > 0) {
          const manager = new ConfigurationManager(loadedConfigs);
          setConfigManager(manager);
          setActiveConfig(manager.getActiveConfig());
        }
      } catch (error) {
        console.error("Failed to load configurations:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeConfigs();
  }, []);

  const handleSetActiveConfig = useCallback(
    (id: string) => {
      configManager.setActiveConfig(id);
      setActiveConfig(configManager.getActiveConfig());
    },
    [configManager],
  );

  const contextValue = useMemo(
    () => ({
      configManager,
      activeConfig,
      setActiveConfig: handleSetActiveConfig,
      isLoading,
    }),
    [configManager, activeConfig, handleSetActiveConfig, isLoading],
  );

  return (
    <ConfigurationContext.Provider value={contextValue}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => useContext(ConfigurationContext);
