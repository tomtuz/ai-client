import { v4 as uuidv4 } from "uuid";

export const responseData = () => {
  return {
    id: uuidv4(),
    model: "deepseek/deepseek-coder",
    object: "chat.completion",
    created: 1723952896,
    choices: [
      {
        logprobs: null,
        finish_reason: "stop",
        index: 0,
        message: {
          role: "assistant",
          content:
            "I am an intelligent assistant, DeepSeek Coder, developed by the Chinese company DeepSeek.",
        },
      },
    ],
    system_fingerprint: "fp_sometest",
    usage: {
      prompt_tokens: 13,
      completion_tokens: 19,
      total_tokens: 32,
    },
  };
};
