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

// OR Record<string, string>;
type headerOptions = {
  [key: string]: string;
};

type headerOption2 = Record<string, string>;

export interface ModelConfig {
  modelId?: string;
  displayName?: string;
  modelName?: string;
  url: string;
  apiToken?: string;
  apiProvider?: "OpenAI" | "Native" | "Custom";
  // custom headers
  headers?: headerOptions;
  body?: string[];
  // prompt sent on every message
  systemMessage?: string;
}
