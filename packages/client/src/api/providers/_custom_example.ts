import { MessageContent } from '@/types/chat';
import { ProviderConfig } from '@/types/modelConfig';

export const CustomModelConfig: ProviderConfig = {
  id: 'custom-model',
  displayName: 'Custom model',
  modelName: 'custom/custom-model',
  systemMessage: '',
  apiProvider: 'Custom',
  baseURL: 'https://test.test.dev/v1/api',
  apiKey: 'custom_token',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer bearer_token',
    'custom-header': 'header-value',
  },
  prepareRequest: (message: string) => ({
    url: 'https://test.test.dev/v1/api',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'custom-header': 'header-value',
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
