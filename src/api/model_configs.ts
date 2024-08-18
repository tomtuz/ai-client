import { APIConfig } from './types';

// models
import { VertexProxyConfig } from './models/vertex_proxy';
import { CustomModelConfig } from './models/_custom_example';
import { DeepseekCoderOpenAIConfig } from './models/deepseek_coder_openai';
import { DeepseekCoderNativeConfig } from './models/deepseek_coder_native';

export const apiConfigs: APIConfig[] = [
  VertexProxyConfig,
  CustomModelConfig,
  DeepseekCoderOpenAIConfig,
  DeepseekCoderNativeConfig
  // Add other API configurations here
];

export const DEFAULT_MODEL_CONFIG = apiConfigs[0];

export type ModelConfig = typeof apiConfigs[number];
export function getModelConfigById(id: string): ModelConfig | undefined {
  return apiConfigs.find(config => config.id === id);
}

