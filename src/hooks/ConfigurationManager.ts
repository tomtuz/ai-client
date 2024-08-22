import { ModelConfig } from "@/api/types";
import { saveConfigurations } from "@/utils/configLoader";

export class ConfigurationManager {
  private configs: ModelConfig[] = [];
  private activeConfigId: string | null = null;

  constructor(initialConfigs: ModelConfig[]) {
    this.configs = initialConfigs;
    this.activeConfigId = initialConfigs[0]?.id || null;
  }

  getConfigs(): ModelConfig[] {
    return this.configs;
  }

  getActiveConfig(): ModelConfig | null {
    return (
      this.configs.find((config) => config.id === this.activeConfigId) || null
    );
  }

  setActiveConfig(id: string): void {
    if (this.configs.some((config) => config.id === id)) {
      this.activeConfigId = id;
    }
  }

  saveConfigs(): void {
    saveConfigurations(this.configs);
  }

  updateConfig(updatedConfig: ModelConfig): void {
    const index = this.configs.findIndex(
      (config) => config.id === updatedConfig.id,
    );
    if (index !== -1) {
      this.configs[index] = updatedConfig;
      this.saveConfigs(); // Save after updating
    }
  }

  addConfig(newConfig: ModelConfig): void {
    if (!this.configs.some((config) => config.id === newConfig.id)) {
      this.configs.push(newConfig);
      this.saveConfigs(); // Save after adding
    }
  }

  removeConfig(id: string): void {
    this.configs = this.configs.filter((config) => config.id !== id);
    if (this.activeConfigId === id) {
      this.activeConfigId = this.configs[0]?.id || null;
    }
    this.saveConfigs(); // Save after removing
  }
}
