// models
import { ModelConfig } from "@/api/types";
import { CustomModelConfig } from "./models/_custom_example";
import { DeepseekNativeOpenAIConfig } from "./models/deepseek_coder_native";
import { DeepseekCoderOpenAIConfig } from "./models/deepseek_coder_openai";
import { OpenRouterConfig } from "./models/open_router";
import { VertexProxyConfig } from "./models/vertex_proxy";

// Model Configs
export const ModelConfigs: ModelConfig[] = [
  VertexProxyConfig,
  OpenRouterConfig,
  DeepseekCoderOpenAIConfig,
  DeepseekNativeOpenAIConfig,
  CustomModelConfig,

  // Add other API configurations here
];

export const DEFAULT_MODEL_CONFIG = ModelConfigs[0];
