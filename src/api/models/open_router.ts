import { APIConfig, ModelConfig } from "../types";

const { EXPOSE_OPENROUTER_URL_NATIVE, EXPOSE_OPENROUTER_API_KEY } = import.meta
  .env;

export const OpenRouterAPI: APIConfig = {
  id: "open-router",
  name: "Open Router (Native)",
  endpoint: EXPOSE_OPENROUTER_URL_NATIVE,

  prepareRequest: (message: string) => ({
    url: EXPOSE_OPENROUTER_URL_NATIVE,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "model_name",
      messages: [
        {
          role: "user",
          content: [
            // message
            { role: "user", content: "What is the meaning of life?" },
          ],
        },
      ],
      max_tokens: 100,
    }),
  }),
  parseResponse: (response: any) => response.choices[0].message.content,
};

export const OpenRouterConfig: ModelConfig = {
  modelId: "open-router",
  displayName: "Open Router (Native)",
  modelName: "model_name",
  url: EXPOSE_OPENROUTER_URL_NATIVE || "",
  apiToken: EXPOSE_OPENROUTER_API_KEY || "",
  apiProvider: "Native",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
  },
};
