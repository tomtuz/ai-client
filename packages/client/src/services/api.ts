import { DeepseekCoderOpenAIConfig } from '@/api/providers/deepseek_coder_openai';
import { OpenRouterModelId } from '@/constants';
import { responseData } from '@/tests/response';
import { MessageContent } from '@/types/chat';
import { ProviderConfig } from '@/types/modelConfig';
import { logger } from '@/utils/logger';

let API_config: ProviderConfig | null = null;
let OpenRouter_model: OpenRouterModelId | null = null;

export const setApiConfig = (config: ProviderConfig) => {
  logger.info(`setting config model: ${JSON.stringify(config, null, 2)}`);
  API_config = config;
};

export const setOpenRouterModel = (model_id: OpenRouterModelId) => {
  OpenRouter_model = model_id;
};

export async function sendMessage(
  message: string,
  isTest = true
): Promise<MessageContent> {
  if (isTest) {
    logger.info('returning TEST response.');
    return (DeepseekCoderOpenAIConfig as ProviderConfig).parseResponse(
      responseData()
    );
  }

  if (!API_config) {
    throw new Error('API not configured');
  }

  const request = API_config.prepareRequest(message);

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
    return API_config.parseResponse(data);
  } catch (error) {
    console.error(`Error sending message to ${API_config.modelName}:`, error);
    throw error;
  }
}
