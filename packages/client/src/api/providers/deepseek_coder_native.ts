import { MessageContent } from '@/types/chat';
import { ProviderConfig } from '@/types/modelConfig';

const { OPENROUTER_API_KEY, YOUR_SITE_URL, YOUR_SITE_NAME } = import.meta.env;

export const DeepseekNativeOpenAIConfig: ProviderConfig = {
  id: 'deepseek-coder-native',
  displayName: 'Deepseek Coder (Native OpenRouter API)',
  modelName: 'deepseek/deepseek-coder',
  systemMessage: '',
  apiProvider: 'Native',
  baseURL: 'https://openrouter.ai/api/v1/chat/completions',
  apiKey: OPENROUTER_API_KEY,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': YOUR_SITE_URL || '',
    'X-Title': YOUR_SITE_NAME || '',
  },
  prepareRequest: (message: string) => ({
    url: 'https://openrouter.ai/api/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': YOUR_SITE_URL || '',
      'X-Title': YOUR_SITE_NAME || '',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-coder',
      messages: [{ role: 'user', content: message }],
    }),
  }),
  parseResponse: (response: any): MessageContent => {
    console.log('responseData: ', response);
    const parsedData: MessageContent = {
      id: response.id,
      type: response.type,
      role: response.choices[0].message.role,
      model: response.model,
      content: [{ text: response.choices[0].message.content }],
      tokens: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
    };
    console.log('parsedData: ', parsedData);
    return parsedData;
  },
};
