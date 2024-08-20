import { APIConfig } from "@/api/types";
import { useEffect, useState } from "react";

export function useAPIConfig() {
  const [configs, setConfigs] = useState<APIConfig[]>([]);

  // Load configs from storage or API
  useEffect(() => {
    // Implement loading logic here
  }, []);

  const saveConfig = (config: APIConfig) => {
    // Implement save logic here
    setConfigs([...configs, config]);
  };

  return { configs, saveConfig };
}
