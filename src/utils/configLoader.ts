import { ModelConfig } from "@/api/types";

export async function loadConfigurations(): Promise<ModelConfig[]> {
  // Simulate an async operation (e.g., fetching from an API or reading a file)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For now, we'll return the configurations from local storage if available
  const storedConfigs = localStorage.getItem("modelConfigurations");
  if (storedConfigs) {
    return JSON.parse(storedConfigs);
  }

  // If no stored configurations, return an empty array
  // In a real scenario, you might want to load default configurations or fetch from an API
  return [];
}

export function saveConfigurations(configs: ModelConfig[]): void {
  localStorage.setItem("modelConfigurations", JSON.stringify(configs));
}
