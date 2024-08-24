export interface ModelInfo {
  maxTokens: number;
  /**
   * (dollars) / 1M tokens
   */
  inputPrice: number;
  /**
   * (dollars) / 1M tokens
   */
  outputPrice: number;
}

export type AnthropicModelId = keyof typeof anthropicModels;
export const anthropicDefaultModelId: AnthropicModelId =
  'claude-3-5-sonnet-20240620';
export const anthropicModels = {
  'claude-3-5-sonnet-20240620': {
    maxTokens: 8192,
    inputPrice: 3.0,
    outputPrice: 15.0,
  },
  'claude-3-sonnet-20240229': {
    // fallback
    maxTokens: 4096,
    inputPrice: 3.0,
    outputPrice: 15.0,
  },
} as const satisfies Record<string, ModelInfo>;

// OpenRouter
export type OpenRouterModelId = keyof typeof openRouterModels;
export const openRouterDefaultModelId: OpenRouterModelId =
  'anthropic/claude-3.5-sonnet:beta';
export const openRouterModels = {
  // moderated
  'anthropic/claude-3.5-sonnet': {
    maxTokens: 8192,
    inputPrice: 3.0,
    outputPrice: 15.0,
  },
  // non moderated
  'anthropic/claude-3.5-sonnet:beta': {
    maxTokens: 8192,
    inputPrice: 3.0,
    outputPrice: 15.0,
  },
  'deepseek/deepseek-coder': {
    maxTokens: 4096,
    inputPrice: 0.14,
    outputPrice: 0.28,
  },
  // mistral models can use tools but aren't great at going step-by-step and proceeding to the next step
  'mistralai/mistral-large': {
    maxTokens: 8192,
    inputPrice: 3,
    outputPrice: 9,
  },
  'openai/gpt-4o-2024-08-06': {
    maxTokens: 16384,
    inputPrice: 2.5,
    outputPrice: 10,
  },
  'openai/gpt-4o-mini-2024-07-18': {
    maxTokens: 16384,
    inputPrice: 0.15,
    outputPrice: 0.6,
  },
  'openai/gpt-4-turbo': {
    maxTokens: 4096,
    inputPrice: 10,
    outputPrice: 30,
  },
} as const satisfies Record<string, ModelInfo>;
