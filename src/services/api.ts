import { APIConfig } from "@/api/types";
import { OpenRouterModelId } from "@/constants";
import { MessageContents } from "@/types/chat";
import { logger } from "@/utils/logger";

let _api_config: APIConfig | null = null;
let _openrouter_model: OpenRouterModelId | null = null;

export const setApiConfig = (config: APIConfig) => {
  logger.info(`setting config model: ${JSON.stringify(config, null, 2)}`);
  _api_config = config;
};

export const setOpenRouterModel = (model_id: OpenRouterModelId) => {
  _openrouter_model = model_id;
};

export async function sendMessage(message: string): Promise<MessageContents> {
  if (!_api_config) {
    throw new Error("API not configured");
  }

  const request = _api_config.prepareRequest(message);

  try {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return _api_config.parseResponse(data);
  } catch (error) {
    console.error(`Error sending message to ${_api_config.name}:`, error);
    throw error;
  }
}
