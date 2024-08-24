import { MessageContent } from '@/types/chat';

// -- API

// Extended configuration with additional properties and methods
export interface ProviderConfig {
  // .app-scope - helpers for application use
  id: string;
  displayName: string;

  // .app-scope/.logic - changes model interaction
  systemMessage: string; // this is more Request scope, but strictly Request format
  apiProvider: 'OpenAI' | 'Native' | 'Custom';

  // .app-scope/.requests - API Request scope + config to Request transformers
  headers: Record<string, string>;
  prepareRequest: (message: string) => RequestConfig;
  parseResponse: (response: any) => MessageContent;

  // .essential-scope - data without which provider is unusable even with defaults
  apiKey?: string;
  baseURL: string;
  modelName: string;
}

type ProviderView = { a: '' };
type ProviderRequestParams = { a: '' };
type ApiParams = { a: '' };

// Configuration for API requests
export interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
}

// -- MODEL

// Base configuration for API models
export interface ModelConfig {
  // .app-scope
  id: string;
  displayName: string;

  // .essential-scope
  apiKey: string;
  baseURL: string;
  model: string;
}

// export const createRequestBody = (headers, api) => {

// }

// export const defaultRequest = {
//   headers: {
//     "Content-Type": "application/json",
//     "x-api-key": EXPOSE_ANTHROPIC_PROXY_API_KEY || "",
//     "anthropic-version": "2023-06-01",
//   },
//   prepareRequest: (message: string) => ({
//     url: EXPOSE_ANTHROPIC_PROXY_URL || "",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // headers
//       // model_name
//       // "x-api-key": EXPOSE_ANTHROPIC_PROXY_API_KEY || "",
//       // "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-3-5-sonnet-20240620",
//       messages: [{ role: "user", content: message }],
//       max_tokens: 100,
//     }),
//   }),
//   parseResponse: (response: any): MessageContent => {
//     console.log("responseData: ", response);
//     const parsedData: MessageContent = {
//       id: response.id,
//       type: response.type,
//       role: response.role,
//       model: response.model,
//       content: [{ text: response.content }],
//       tokens: {
//         input: response.usage.input_tokens,
//         output: response.usage.output_tokens,
//       },
//     };
//     console.log("parsedData: ", parsedData);
//     return parsedData;
//   },
// }
