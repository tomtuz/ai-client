import { MessageContent } from "@/types/chat";

export interface ModelConfig {
  id: string;
  displayName: string;
  modelName: string;
  apiProvider: "OpenAI" | "Native" | "Custom";
  endpoint: string;
  apiToken?: string;
  headers: Record<string, string>;
  prepareRequest: (message: string) => RequestConfig;
  parseResponse: (response: any) => MessageContent;
  systemMessage?: string;
}

export interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
}
