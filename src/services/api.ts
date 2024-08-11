import { APIConfig } from '@/api/types';
import { Message } from '@/types/chat';

let currentApi: APIConfig | null = null;

export const configureApi = (config: APIConfig) => {
  currentApi = config;
};

export async function sendMessage(message: string): Promise<Message> {
  if (!currentApi) {
    throw new Error('API not configured');
  }

  const request = currentApi.prepareRequest(message);

  try {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return currentApi.parseResponse(data);
  } catch (error) {
    console.error(`Error sending message to ${currentApi.name}:`, error);
    throw error;
  }
}

