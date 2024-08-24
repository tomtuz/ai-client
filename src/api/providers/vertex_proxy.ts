import { MessageContent } from '@/types/chat';
import { ProviderConfig } from '@/types/modelConfig';

const { EXPOSE_ANTHROPIC_PROXY_URL, EXPOSE_ANTHROPIC_PROXY_API_KEY } =
  import.meta.env;

export const VertexProxyConfig: ProviderConfig = {
  // .app-scope - helpers for application use
  id: 'vertex-anthropic-proxy',
  displayName: 'Anthropic (vertex r-proxy)',

  // .app-scope/.logic - changes model interaction
  systemMessage: '',
  apiProvider: 'Custom',

  // .essential-scope - data without which provider is unusable even with defaults
  apiKey: EXPOSE_ANTHROPIC_PROXY_API_KEY || '',
  baseURL: EXPOSE_ANTHROPIC_PROXY_URL || '',
  modelName: 'claude-3-5-sonnet-20240620',

  // .app-scope/.requests - API Request scope + config to Request transformers
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': EXPOSE_ANTHROPIC_PROXY_API_KEY || '',
    'anthropic-version': '2023-06-01',
  },
  prepareRequest: (message: string) => ({
    url: EXPOSE_ANTHROPIC_PROXY_URL || '',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': EXPOSE_ANTHROPIC_PROXY_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20240620',
      messages: [{ role: 'user', content: message }],
      max_tokens: 100,
    }),
  }),
  parseResponse: (response: any): MessageContent => {
    console.log('responseData: ', response);
    const parsedData: MessageContent = {
      id: response.id,
      type: response.type,
      role: response.role,
      model: response.model,
      content: [{ text: response.content }],
      tokens: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
    };
    console.log('parsedData: ', parsedData);
    return parsedData;
  },
};
