import { MessageContent } from "@/types/chat";
import { ModelConfig } from "../types";

const { EXPOSE_OPENROUTER_API_KEY, EXPOSE_OPENROUTER_URL_OPEN } = import.meta
  .env;

export const DeepseekCoderOpenAIConfig: ModelConfig = {
  id: "deepseek-coder-openai",
  displayName: "Deepseek Coder (OpenAI API)",
  modelName: "deepseek/deepseek-coder",
  apiProvider: "OpenAI",
  endpoint:
    EXPOSE_OPENROUTER_URL_OPEN ||
    "https://openrouter.ai/api/v1/chat/completions",
  apiToken: EXPOSE_OPENROUTER_API_KEY,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
  },
  prepareRequest: (message: string) => ({
    url:
      EXPOSE_OPENROUTER_URL_OPEN ||
      "https://openrouter.ai/api/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-coder",
      messages: [{ role: "user", content: message }],
    }),
  }),
  parseResponse: (response: any): MessageContent => {
    console.log("responseData: ", response);
    const parsedData: MessageContent = {
      id: response.id,
      type: response.object,
      role: response.choices[0].message.role,
      model: response.model,
      content: [{ text: response.choices[0].message.content }],
      tokens: {
        input: response.usage.prompt_tokens,
        output: response.usage.completion_tokens,
      },
    };
    console.log("parsedData: ", parsedData);
    return parsedData;
  },
};
