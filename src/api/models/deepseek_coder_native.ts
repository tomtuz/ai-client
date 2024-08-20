import { MessageContents } from "@/types/chat";
import { APIConfig, ModelConfig } from "../types";

const { OPENROUTER_API_KEY, YOUR_SITE_URL, YOUR_SITE_NAME } = import.meta.env;

export const DeepseekNativeOpenAIAPI: APIConfig = {
  id: "deepseek-coder-native",
  name: "Deepseek Coder (Native OpenRouter API)",
  endpoint: "https://openrouter.ai/api/v1/chat/completions",
  prepareRequest: (message: string) => ({
    url: "https://openrouter.ai/api/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": YOUR_SITE_URL || "",
      "X-Title": YOUR_SITE_NAME || "",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-coder",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
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
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
    };

    console.log("parsedData: ", parsedData);
    return parsedData;
  },
};

export const DeepseekNativeOpenAIConfig: ModelConfig = {
  modelId: "deepseek-coder-native",
  displayName: "Deepseek Coder (Native OpenRouter API)",
  modelName: "deepseek/deepseek-coder",
  url: "https://openrouter.ai/api/v1/chat/completions",
  apiToken: OPENROUTER_API_KEY,
  apiProvider: "Native",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    // "HTTP-Referer": YOUR_SITE_URL || "", // optional
    // "X-Title": YOUR_SITE_NAME || "", // optional
  },
};
