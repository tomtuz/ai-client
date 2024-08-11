import { APIConfig } from '@/api/types';
import { vertexProxyConfig } from '@/api/models/vertex_proxy';
import { customModelConfig } from '@/api/models/_custom_example';

export const apiConfigs: APIConfig[] = [
  vertexProxyConfig,
  customModelConfig
  // Add other API configurations here
];

