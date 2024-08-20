import { APIConfig } from "../types";

const { EXPOSE_OPENROUTER_URL_NATIVE, EXPOSE_OPENROUTER_API_KEY } = import.meta
  .env;

export const OpenRouterConfig: APIConfig = {
  id: "open-router",
  name: "Open Router (Native)",
  endpoint: EXPOSE_OPENROUTER_URL_NATIVE,

  prepareRequest: (message: string) => ({
    url: EXPOSE_OPENROUTER_URL_NATIVE,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EXPOSE_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "model_name",
      messages: [
        {
          role: "user",
          content: [
            // message
            { role: "user", content: "What is the meaning of life?" },
          ],
        },
      ],
      max_tokens: 100,
    }),
  }),
  parseResponse: (response: any) => response.choices[0].message.content,
};

// API example
// fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//     "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
//     "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     "model": "openai/gpt-3.5-turbo",
//     "messages": [
//       {"role": "user", "content": "What is the meaning of life?"},
//     ],
//   })
// });
