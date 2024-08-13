import { MessageContents } from "@/types/chat";

export interface APIConfig {
  id: string,
  name: string;
  endpoint: string;
  prepareRequest: (message: string) => {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: any;
  };
  parseResponse: (response: any) => MessageContents;
}

