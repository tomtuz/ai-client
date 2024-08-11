import { ApiConfig } from '@/types/api';

export const apiConfigs: Record<string, ApiConfig> = {
  chatgpt: {
    name: 'ChatGPT',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
    },
  },
  anthropic: {
    name: 'Anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    headers: {
      'X-API-Key': 'YOUR_ANTHROPIC_API_KEY',
    },
  },
  openrouter: {
    name: 'OpenRouter',
    endpoint: 'https://example.test/error',
    headers: {
      'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY',
    },
  },
  vertexai: { // should support reverse proxy
    name: 'VertexAI',
    endpoint: 'https://example.test/error',
    headers: {
      'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY',
    },
  },
  custom: {
    endpoint: 'localhost'
  },
};
