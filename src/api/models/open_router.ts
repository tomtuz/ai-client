import { APIConfig } from "../types";

export const OpenRouterConfig: APIConfig = {
  id: "open-router",
  name: "Open Router",
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
          content: message
        }
      ],
      max_tokens: 100
    })
  }),
  parseResponse: (response: any) => response.choices[0].message.content
};

