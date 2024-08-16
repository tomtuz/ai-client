import { APIConfig } from './types';
import { VertexProxyConfig } from './models/vertex_proxy';
import { CustomModelConfig } from './models/_custom_example';

export const apiConfigs: APIConfig[] = [
  VertexProxyConfig,
  CustomModelConfig
  // Add other API configurations here
];
