import { APIConfig } from './types';
import { vertexProxyConfig } from './models/vertex_proxy';
import { customModelConfig } from './models/_custom_example';

export const apiConfigs: APIConfig[] = [
  vertexProxyConfig,
  customModelConfig
  // Add other API configurations here
];
