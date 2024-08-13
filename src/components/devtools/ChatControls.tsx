import { Button } from "../cn/ui";
import { code_string } from "@/tests/msg_code";
import { msg_long } from "@/tests/msg_long";

interface ChatControlsProps {
  onAddTestMessage: (textMsg: string, role: string) => void;
  onSendMessage: (message: string) => void;
}

export function ChatControls({
  onSendMessage,
  onAddTestMessage,
}: Readonly<ChatControlsProps>) {
  const handlePromptTest = () => {
    console.log("sending test prompt");
    onSendMessage("say just the word 'apple'");
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
