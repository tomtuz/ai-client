import { ModelConfig } from "@/api/types";
import { MessageContent } from "@/types/chat";

const { EXPOSE_ANTHROPIC_PROXY_URL, EXPOSE_ANTHROPIC_PROXY_API_KEY } =
  import.meta.env;

export const VertexProxyConfig: ModelConfig = {
  id: "vertex-anthropic-proxy",
  displayName: "Anthropic (vertex r-proxy)",
  modelName: "claude-3-5-sonnet-20240620",
  apiProvider: "Custom",
  endpoint: EXPOSE_ANTHROPIC_PROXY_URL || "",
  apiToken: EXPOSE_ANTHROPIC_PROXY_API_KEY || "",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": EXPOSE_ANTHROPIC_PROXY_API_KEY || "",
    "anthropic-version": "2023-06-01",
  },
  prepareRequest: (message: string) => ({
    url: EXPOSE_ANTHROPIC_PROXY_URL || "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": EXPOSE_ANTHROPIC_PROXY_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    }),
  }),
  parseResponse: (response: any): MessageContent => {
    console.log("responseData: ", response);
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
    console.log("parsedData: ", parsedData);
    return parsedData;
  },
};
