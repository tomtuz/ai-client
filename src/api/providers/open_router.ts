import { MessageContent } from '@/types/chat';
import { ProviderConfig } from '@/types/modelConfig';

const { EXPOSE_OPENROUTER_URL_NATIVE, EXPOSE_OPENROUTER_API_KEY } = import.meta
  .env;

export const OpenRouterConfig: ProviderConfig = {
  id: 'open-router',
  displayName: 'Open Router (Native)',
  modelName: 'model_name',
  systemMessage: '',
  apiProvider: 'Native',
  baseURL: EXPOSE_OPENROUTER_URL_NATIVE || '',
  apiKey: EXPOSE_OPENROUTER_API_KEY || '',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
  },
  prepareRequest: (message: string) => ({
    url: EXPOSE_OPENROUTER_URL_NATIVE || '',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'model_name',
      messages: [{ role: 'user', content: message }],
      max_tokens: 100,
    }),
  }),
  parseResponse: (response: any): MessageContent => ({
    id: response.id,
    type: 'chat.completion',
    role: 'assistant',
    model: response.model,
    content: [{ text: response.choices[0].message.content }],
  }),
};
