// models
import { ProviderConfig } from '@/types/modelConfig';
import { CustomModelConfig } from './providers/_custom_example';
import { DeepseekNativeOpenAIConfig } from './providers/deepseek_coder_native';
import { DeepseekCoderOpenAIConfig } from './providers/deepseek_coder_openai';
import { OpenRouterConfig } from './providers/open_router';
import { VertexProxyConfig } from './providers/vertex_proxy';

// Model Configs | Although these are API related
export const ProviderConfigs: ProviderConfig[] = [
  VertexProxyConfig,
  OpenRouterConfig,
  DeepseekCoderOpenAIConfig,
  DeepseekNativeOpenAIConfig,
  CustomModelConfig,

  // Add other API configurations here
];

export const DEFAULT_MODEL_CONFIG = ProviderConfigs[0];
