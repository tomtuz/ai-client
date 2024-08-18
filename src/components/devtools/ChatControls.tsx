import { apiConfigs } from "@/api/model_configs";
import { Button } from "../cn/ui";
import { code_string } from "@/tests/msg_code";
import { msg_long } from "@/tests/msg_long";
import { MessageContents } from "@/types/chat";
import { MessageContent } from "openai/resources/beta/threads/messages";
import { DeepseekCoderOpenAIConfig } from "@/api/models/deepseek_coder_openai";

interface ChatControlsProps {
  onAddTestMessage: (textMsg: string, role: string) => void;
  onSendMessage: (message: string) => void;
  onTestResponse: (response: MessageContents) => void;
}

export function ChatControls({
  onSendMessage,
  onAddTestMessage,
  onTestResponse,
}: Readonly<ChatControlsProps>) {
  const handlePromptTest = () => {
    console.log("sending test prompt");
    onSendMessage("say just the word 'apple'");
  };

  const handleTestResponse = () => {
    // test response
    const raw_response = {
      id: "gen-randomChars",
      model: "deepseek/deepseek-coder",
      object: "chat.completion",
      created: 4812349823,
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
      system_fingerprint: "fp_df023f02j0f2",
      usage: {
        prompt_tokens: 13,
        completion_tokens: 19,
        total_tokens: 32,
      },
    };

    const deepResponse = DeepseekCoderOpenAIConfig.parseResponse(raw_response);
    onTestResponse(deepResponse);
  };

  const handleTestMessage = (msg: string, role: string) => {
    onAddTestMessage(msg, role);
  };

  const handleLongMessage = () => {
    onAddTestMessage(msg_long, "user");
  };

  const handleCodeMessage = async () => {
    onAddTestMessage(code_string, "ai");
  };

  return (
    <div className="my-component">
      <h1>Chat controls</h1>
      <div className="content">
        <div className="flex flex-col p-2 gap-2">
          <Button
            type="button"
            onClick={handlePromptTest}
          >
            Test prompt (Live)
          </Button>
          <Button
            type="button"
            onClick={() => handleTestMessage("test message User", "user")}
          >
            Test DeepSeek (offline)
          </Button>
          <Button
            type="button"
            onClick={() => handleTestResponse()}
          >
            Add msg (user)
          </Button>
          <Button
            type="button"
            onClick={() => handleTestMessage("test message AI", "ai")}
          >
            Add msg (AI)
          </Button>
          <Button
            type="button"
            onClick={() => handleLongMessage()}
          >
            Add long msg
          </Button>
          <Button
            type="button"
            onClick={() => handleCodeMessage()}
          >
            Add code message
          </Button>
        </div>
      </div>
    </div>
  );
}
