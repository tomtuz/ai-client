import OpenAI from 'openai';
import { MessageContents } from '@/types/chat';
import { APIConfig } from '../types';

const {
  EXPOSE_OPENROUTER_API_KEY,
  EXPOSE_OPENROUTER_URL_OPEN,
  EXPOSE_OPENROUTER_URL_NATIVE,
} = import.meta.env;

const openai = new OpenAI({
  baseURL: EXPOSE_OPENROUTER_URL_OPEN || "https://openrouter.ai/api/v1",
  apiKey: EXPOSE_OPENROUTER_API_KEY,
  defaultHeaders: {
    // "HTTP-Referer": YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
    // "X-Title": YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  },
  dangerouslyAllowBrowser: true
})

export const DeepseekCoderOpenAIConfig: APIConfig = {
  id: "deepseek-coder-openai",
  name: "Deepseek Coder (OpenAI API)",
  endpoint: "https://openrouter.ai/api/v1/chat/completions",
  prepareRequest: (message: string) => ({
    url: "https://openrouter.ai/api/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-coder",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    })
  }),
  parseResponse: (response): MessageContents => {
    console.log("responseData: ", response);
    const parsedData = {
      id: response.id,
      type: response.type,
      role: response.choices[0].message.role,
      model: response.model,
      content: response.choices[0].message.content,
      tokens: {
        input: response.usage.prompt_tokens,
        output: response.usage.completion_tokens,
        total: response.usage.total_tokens,
      }
    };

    console.log("parsedData: ", parsedData);
    return parsedData;
  }
};
