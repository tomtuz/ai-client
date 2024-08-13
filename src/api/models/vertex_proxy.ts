import { MessageContents } from '@/types/chat';
import { APIConfig } from '../types';

const {
  EXPOSE_ANTHROPIC_PROXY_URL,
  EXPOSE_ANTHROPIC_PROXY_API_KEY
} = import.meta.env

// Google Vertex AI endpoint used with a custom reverse proxy
export const VertexProxyConfig: APIConfig = {
  id: "vertex-anthropic-proxy",
  name: "Anthropic (vertex r-proxy)",
  endpoint: EXPOSE_ANTHROPIC_PROXY_URL || "",
  prepareRequest: (message: string) => ({
    url: EXPOSE_ANTHROPIC_PROXY_URL || "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": EXPOSE_ANTHROPIC_PROXY_API_KEY || "",
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 100
    })
  }),
  parseResponse: (response): MessageContents => {
    console.log("responseData: ", response)
    const parsedData = {
      id: response.id,
      type: response.type,
      role: response.role,
      model: response.model,
      content: response.content,
      tokens: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens
      }
    };

    console.log("parsedData: ", parsedData)
    return parsedData
  }
};
