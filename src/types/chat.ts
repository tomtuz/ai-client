export interface MessageContent {
  id: string;
  type?: string;
  role?: string;
  model?: string;
  content: {
    type?: string;
    text: string;
  }[];
  tokens?: {
    input: number;
    output: number;
  };
}

export interface SelectId {
  id: string;
}
