import { VertexProxyConfig } from '@/api/models/vertex_proxy';
import { OpenRouterConfig } from '@/api/models/open_router';
import { CustomModelConfig } from '@/api/models/_custom_example';

export const ModelConfigs = [
  OpenRouterConfig,
  VertexProxyConfig,
  CustomModelConfig
] as const;

export type ModelConfig = typeof ModelConfigs[number];

export const DEFAULT_MODEL_CONFIG = ModelConfigs[0];

export function getModelConfigById(id: string): ModelConfig | undefined {
  return ModelConfigs.find(config => config.id === id);
}
