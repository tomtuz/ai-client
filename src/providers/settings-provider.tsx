import { VertexProxyConfig } from "@/api/models/vertex_proxy";
import { ModelConfig } from "@/api/types";
import { createContext, useState } from "react";

type SettingsProviderProps = {
  children: React.ReactNode;
};

const initialState: ModelConfig[] = [
  VertexProxyConfig,
  // Add other API configurations here
];

export const SettingsProviderContext =
  createContext<ModelConfig[]>(initialState);

export function SettingsProvider({ children }: SettingsProviderProps) {
  // const [config, setConfig] = useState<ModelConfig[]>(() => []);
  return (
    <SettingsProviderContext.Provider value={initialState}>
      {children}
    </SettingsProviderContext.Provider>
  );
}
