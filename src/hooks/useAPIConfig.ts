// import { ProviderConfig } from "@/types/modelConfig";
// import { loadConfigurations } from "@/utils/configLoader";
// import { logger } from "@/utils/logger";
// import { useCallback, useEffect, useState } from "react";
// import { ConfigurationManager } from "./ConfigurationManager";

// export function useAPIConfig() {
//   const [configManager, setConfigManager] =
//     useState<ConfigurationManager | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const initConfigs = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const loadedConfigs = await loadConfigurations();
//         const manager = new ConfigurationManager(loadedConfigs, logger);
//         setConfigManager(manager);
//       } catch (err) {
//         logger.error("Failed to load configurations:", err);
//         setError("Failed to load configurations. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initConfigs();
//   }, []);

//   const saveConfig = useCallback(
//     async (config: ProviderConfig) => {
//       if (!configManager) {
//         setError("Configuration manager not initialized");
//         return;
//       }
//       try {
//         await configManager.addConfig(config);
//       } catch (err) {
//         logger.error("Failed to save configuration:", err);
//         setError("Failed to save configuration. Please try again.");
//       }
//     },
//     [configManager],
//   );

//   // Implement updateConfig and removeConfig similarly...

//   return {
//     isLoading,
//     error,
//     saveConfig,
//     // Include other methods like updateConfig, removeConfig
//     getConfigs: useCallback(
//       () => configManager?.getConfigs() ?? [],
//       [configManager],
//     ),
//   };
// }
