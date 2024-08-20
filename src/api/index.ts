// models
// import { VertexProxyConfig } from "./models/vertex_proxy";
// import { CustomModelConfig } from "./models/_custom_example";
// import { DeepseekCoderOpenAIConfig } from "./models/deepseek_coder_openai";
// import { DeepseekCoderNativeConfig } from "./models/deepseek_coder_native";

import { ModelConfig } from "@/api/types";
import { VertexProxyConfig } from "./models/vertex_proxy";

// import { CustomModelConfig } from "./models/_custom_example";
// import { DeepseekCoderOpenAIConfig } from "./models/deepseek_coder_openai";
// import { DeepseekCoderNativeConfig } from "./models/deepseek_coder_native";

import { apiConfigs, getModelConfigById } from "./api_configs";

// APIodel Configs
// export const ModelConfigs: ModelConfig[] = [
//   VertexProxyConfig,
//   CustomModelConfig,
//   DeepseekCoderOpenAIConfig,
//   DeepseekCoderNativeConfig,
// ]

// const convert(ModelConfig) => {

// }

// export const ModelConfigs: ModelConfig[] = [
//   VertexProxyConfig,
//   CustomModelConfig,
//   DeepseekCoderOpenAIConfig,
//   DeepseekCoderNativeConfig,
//   // Add other API configurations here
// ];

// Model Configs
export const ModelConfigs: ModelConfig[] = [
  VertexProxyConfig,
  // Add other API configurations here
];

export const DEFAULT_MODEL_CONFIG = ModelConfigs[0];

// export type ModelConfig = (typeof apiConfigs)[number];
// export function getModelConfigById(id: string): ModelConfig | undefined {
//   return apiConfigs.find((config) => config.id === id);
// }
