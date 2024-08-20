import { APIConfig, ModelConfig } from "../types";

export const CustomModelAPI: APIConfig = {
  id: "custom-model",
  name: "Custom model",
  endpoint: "https://test.test.dev/v1/api",
  prepareRequest: (message: string) => ({
    url: "https://test.test.dev/v1/api",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "custom-header": "header-value",
    },
    body: JSON.stringify({
      model: "model_name",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 100,
    }),
  }),
  parseResponse: (response: any) => response.choices[0].message.content,
};

export const CustomModelConfig: ModelConfig = {
  modelId: "cusotm-model",
  displayName: "Custom model",
  modelName: "custom/custom-model",
  url: "https://example.com/",
  apiToken: "custom_token",
  apiProvider: "Custom",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer bearer_token",
    // "HTTP-Referer": YOUR_SITE_URL || "", // optional
    // "X-Title": YOUR_SITE_NAME || "", // optional
  },
};
