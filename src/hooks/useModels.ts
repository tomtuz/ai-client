import { SettingsProviderContext } from "@/providers/settings-provider";
import { useContext } from "react";

export const useModels = () => {
  const context = useContext(SettingsProviderContext);

  if (context === undefined) {
    throw new Error("useModels must be used within a SettingsProvider");
  }

  return context;
};
