import { MessageContents } from "@/types/chat";

export interface APIConfig {
  id: string;
  name: string;
  endpoint: string;
  apiToken?: "string";
  prepareRequest: (message: string) => {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: any;
  };
  parseResponse: (response: any) => MessageContents;
  headers?: string[];
}

type headerOption = {
  [key: string]: string | number;
};

export interface ModelConfig {
  modelId?: string;
  displayName?: string;
  modelName?: string;
  url: string;
  apiToken?: string;
  apiProvider?: "OpenAPI" | "Native" | "Custom";
  // custom headers
  headers?: Array<headerOption>;
  body?: string[];
  // prompt sent on every message
  systemMessage?: string;
}
