import { ProviderConfig } from '@/types/modelConfig';

import { saveConfigurations } from '@/utils/configLoader';
import { Logger } from '@/utils/logger';

import { z } from 'zod';

type ConfigChangeListener = (
  configs: ProviderConfig[],
  activeConfigId: string | null
) => void;

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

const configSchema = z.object({
  id: z.string(),
  name: z.string(),
  apiKey: z.string(),
  baseURL: z.string().url(),
  models: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

// DOMAIN: Config
export class ConfigurationManager {
  private configs: ProviderConfig[];
  private activeConfigId: string | null;
  private listeners: ConfigChangeListener[] = [];
  private configCache: Map<string, ProviderConfig> = new Map();
  private logger: Console | Logger;

  constructor(initialConfigs: ProviderConfig[], logger?: Logger) {
    this.configs = [...initialConfigs];
    this.activeConfigId = initialConfigs[0]?.id || null;
    this.updateCache();
    this.logger = logger || console;
  }

  private updateCache(): void {
    this.configCache.clear();
    for (const config of this.configs) {
      this.configCache.set(config.id, config);
    }
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.configs as ProviderConfig[], this.activeConfigId);
    }
  }

  addChangeListener(listener: ConfigChangeListener): void {
    this.listeners.push(listener);
  }

  removeChangeListener(listener: ConfigChangeListener): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  getConfigs(): ProviderConfig[] {
    return [...this.configs];
  }

  getConfigById(id: string): ProviderConfig | undefined {
    return this.configCache.get(id);
  }

  getConfigByName(name: string): ProviderConfig | undefined {
    return this.configs.find((config) => config.displayName === name);
  }

  getActiveConfig(): ProviderConfig | null {
    return this.activeConfigId
      ? this.configCache.get(this.activeConfigId) || null
      : null;
  }

  setActiveConfig(id: string): void {
    if (id !== this.activeConfigId) {
      if (this.configCache.has(id)) {
        this.activeConfigId = id;
        this.notifyListeners();
      } else {
        throw new ConfigurationError(`Configuration with id ${id} not found`);
      }
    }
  }

  async saveConfigs(): Promise<void> {
    try {
      await saveConfigurations(this.configs);
    } catch (error) {
      this.logger.error('Failed to save configurations:', error);
      throw new ConfigurationError('Failed to save configurations');
    }
  }

  async updateConfig(updatedConfig: ProviderConfig): Promise<void> {
    try {
      configSchema.parse(updatedConfig);
      const index = this.configs.findIndex(
        (config) => config.id === updatedConfig.id
      );
      if (index !== -1) {
        this.configs = [
          ...this.configs.slice(0, index),
          updatedConfig,
          ...this.configs.slice(index + 1),
        ];
        this.updateCache();
        await this.saveConfigs();
        this.notifyListeners();
      } else {
        throw new ConfigurationError(
          `Configuration with id ${updatedConfig.id} not found`
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ConfigurationError(`Invalid configuration: ${error.message}`);
      }
      throw error;
    }
  }

  async addConfig(newConfig: ProviderConfig): Promise<void> {
    try {
      configSchema.parse(newConfig);
      if (!this.configCache.has(newConfig.id)) {
        this.configs = [...this.configs, newConfig];
        this.updateCache();
        await this.saveConfigs();
        this.notifyListeners();
      } else {
        throw new ConfigurationError(
          `Configuration with id ${newConfig.id} already exists`
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ConfigurationError(`Invalid configuration: ${error.message}`);
      }
      throw error;
    }
  }

  async removeConfig(id: string): Promise<void> {
    if (!this.configCache.has(id)) {
      throw new ConfigurationError(`Configuration with id ${id} not found`);
    }
    this.configs = this.configs.filter((config) => config.id !== id);
    if (this.activeConfigId === id) {
      this.activeConfigId = this.configs[0]?.id || null;
    }
    this.updateCache();
    await this.saveConfigs();
    this.notifyListeners();
  }

  async bulkUpdateConfigs(updatedConfigs: ProviderConfig[]): Promise<void> {
    try {
      for (const config of updatedConfigs) {
        configSchema.parse(config);
      }
      this.configs = updatedConfigs;
      this.updateCache();
      await this.saveConfigs();
      this.notifyListeners();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        throw new ConfigurationError(`Invalid configuration: ${error.message}`);
      }
      if (error instanceof Error) {
        this.logger.error('Failed to update configurations:', error.message);
      } else {
        this.logger.error('Failed to update configurations:', String(error));
      }
      throw new ConfigurationError('Failed to update configurations');
    }
  }

  resetToDefault(defaultConfigs: ProviderConfig[]): void {
    this.configs = [...defaultConfigs];
    this.activeConfigId = defaultConfigs[0]?.id || null;
    this.updateCache();
    this.notifyListeners();
  }

  searchConfigs(searchTerm: string): ProviderConfig[] {
    const lowercasedTerm = searchTerm.toLowerCase();
    return this.configs.filter((config) =>
      config.displayName.toLowerCase().includes(lowercasedTerm)
    );
  }

  cloneConfig(id: string): ProviderConfig {
    const configToClone = this.getConfigById(id);
    if (!configToClone) {
      throw new ConfigurationError(`Configuration with id ${id} not found`);
    }
    const clonedConfig: ProviderConfig = {
      ...configToClone,
      id: `${configToClone.id}_clone_${Date.now()}`,
      displayName: `${configToClone.displayName} (Clone)`,
    };
    return clonedConfig;
  }

  exportConfigs(): string {
    return JSON.stringify(this.configs, null, 2);
  }

  importConfigs(configsJson: string): void {
    try {
      const parsedConfigs: ProviderConfig[] = JSON.parse(configsJson);
      for (const config of parsedConfigs) {
        configSchema.parse(config);
      }
      this.configs = parsedConfigs;
      this.updateCache();
      this.notifyListeners();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ConfigurationError(`Invalid configuration: ${error.message}`);
      }
      this.logger.error('Failed to import configurations:', error);
      throw new ConfigurationError('Failed to import configurations');
    }
  }
}
