import { ApiConfig } from '@/types/api';

let currentApi: ApiConfig | null = null;

export const configureApi = (config: ApiConfig) => {
  currentApi = config;
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!currentApi) {
    throw new Error('API not configured');
  }

  const response = await fetch(currentApi.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...currentApi.headers,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  return data.response;
};
