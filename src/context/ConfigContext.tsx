import { ProviderConfigs } from '@/api';
import { ConfigurationManager } from '@/hooks/ConfigurationManager';
import { ProviderConfig } from '@/types/modelConfig';
import { loadConfigurations } from '@/utils/configLoader';
import { Logger } from '@/utils/logger';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface ConfigState {
  configManager: ConfigurationManager;
  activeConfig: ProviderConfig | null;
  isLoading: boolean;
  error: string | null;
}

type ConfigAction =
  | { type: 'SET_CONFIG_MANAGER'; payload: ConfigurationManager }
  | { type: 'SET_ACTIVE_CONFIG'; payload: ProviderConfig | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_CONFIGURATIONS'; payload: ProviderConfig[] };

const configReducer = (
  state: ConfigState,
  action: ConfigAction
): ConfigState => {
  switch (action.type) {
    case 'SET_CONFIG_MANAGER':
      return { ...state, configManager: action.payload };
    case 'SET_ACTIVE_CONFIG':
      return { ...state, activeConfig: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_CONFIGURATIONS': {
      const newManager = new ConfigurationManager(action.payload);
      return { ...state, configManager: newManager };
    }
    default:
      return state;
  }
};

interface ConfigurationContextType extends ConfigState {
  setActiveConfig: (id: string) => void;
  updateConfigurations: (newConfigs: ProviderConfig[]) => void;
}

const ConfigurationContext = createContext<
  ConfigurationContextType | undefined
>(undefined);

// Cache key for storing configurations in localStorage
const CONFIG_CACHE_KEY = 'cachedConfigurations';

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(configReducer, {
    configManager: new ConfigurationManager(
      ProviderConfigs,
      console as unknown as Logger
    ),

    activeConfig: null,
    isLoading: true,
    error: null,
  });

  // Load configurations from cache or fetch them
  const initializeConfigs = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Try to load from cache first
      const cachedConfigs = localStorage.getItem(CONFIG_CACHE_KEY);
      let loadedConfigs: ProviderConfig[];

      if (cachedConfigs) {
        loadedConfigs = JSON.parse(cachedConfigs);
      } else {
        loadedConfigs = await loadConfigurations();
        // Cache the loaded configurations
        localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(loadedConfigs));
      }

      if (loadedConfigs.length > 0) {
        const manager = new ConfigurationManager(loadedConfigs);
        dispatch({ type: 'SET_CONFIG_MANAGER', payload: manager });
        const active = manager.getActiveConfig();
        dispatch({ type: 'SET_ACTIVE_CONFIG', payload: active });
        localStorage.setItem('activeConfigId', active?.id || '');
      } else {
        throw new Error('No configurations loaded');
      }
    } catch (error) {
      console.error('Failed to load configurations:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to load configurations. Please try again.',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  useEffect(() => {
    initializeConfigs();
  }, [initializeConfigs]);

  const handleSetActiveConfig = useCallback(
    (id: string) => {
      const newActiveConfig = state.configManager.getConfigById(id);
      if (newActiveConfig) {
        state.configManager.setActiveConfig(id);
        dispatch({ type: 'SET_ACTIVE_CONFIG', payload: newActiveConfig });
        localStorage.setItem('activeConfigId', id);
      }
    },
    [state.configManager]
  );

  // const updateConfigurations = useCallback(
  //   (newConfigs: ProviderConfig[]) => {
  //     dispatch({ type: "UPDATE_CONFIGURATIONS", payload: newConfigs });
  //     const activeId = localStorage.getItem("activeConfigId");
  //     if (activeId) {
  //       handleSetActiveConfig(activeId);
  //     } else {
  //       const newManager = new ConfigurationManager(newConfigs);
  //       dispatch({
  //         type: "SET_ACTIVE_CONFIG",
  //         payload: newManager.getActiveConfig(),
  //       });
  //     }
  //     // Update cache
  //     localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(newConfigs));
  //   },
  //   [handleSetActiveConfig],
  // );

  const updateConfigurations = useCallback(
    (newConfigs: ProviderConfig[]) => {
      dispatch({ type: 'UPDATE_CONFIGURATIONS', payload: newConfigs });
      const activeId = localStorage.getItem('activeConfigId');
      if (activeId) {
        const newActiveConfig = newConfigs.find(
          (config) => config.id === activeId
        );
        if (newActiveConfig) {
          dispatch({ type: 'SET_ACTIVE_CONFIG', payload: newActiveConfig });
        } else {
          handleSetActiveConfig(newConfigs[0]?.id);
        }
      } else {
        handleSetActiveConfig(newConfigs[0]?.id);
      }
      localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(newConfigs));
    },
    [handleSetActiveConfig]
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      setActiveConfig: handleSetActiveConfig,
      updateConfigurations,
    }),
    [state, handleSetActiveConfig, updateConfigurations]
  );

  return (
    <ConfigurationContext.Provider value={contextValue}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error(
      'useConfiguration must be used within a ConfigurationProvider'
    );
  }
  return context;
};

// Utility function to clear the configuration cache
export const clearConfigCache = () => {
  localStorage.removeItem(CONFIG_CACHE_KEY);
};
