import { code_string } from "@/tests/msg_code";
import { msg_long } from "@/tests/msg_long";
import { MessageContent } from "@/types/chat";
import { Button } from "@cn/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ChatControlsProps {
  onAddTestMessage: (textMsg: string, role: string) => void;
  onSendMessage: (message: string) => void;
  onTestResponse: (response: MessageContent) => void;
}

const testButtons = [
  { label: "Test prompt (Live)", action: "promptTest" },
  { label: "Test DeepSeek (offline)", action: "testMessage" },
  { label: "Add msg (user)", action: "testResponse" },
  { label: "Add msg (AI)", action: "testAIMessage" },
  { label: "Add long msg", action: "longMessage" },
  { label: "Add code message", action: "codeMessage" },
];

export function ChatControls({
  onAddTestMessage,
  onSendMessage,
  onTestResponse,
}: Readonly<ChatControlsProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = useCallback(
    (action: string) => {
      switch (action) {
        case "promptTest":
          onSendMessage("say just the word 'apple'");
          break;
        case "testMessage":
          onAddTestMessage("test message User", "user");
          break;
        case "testResponse":
          onTestResponse({
            id: uuidv4(),
            role: "assistant",
            type: "text",
            content: [{ text: "This is a test response.", type: "testxt" }],
          });
          break;
        case "testAIMessage":
          onAddTestMessage("test message AI", "ai");
          break;
        case "longMessage":
          onAddTestMessage(msg_long, "user");
          break;
        case "codeMessage":
          onAddTestMessage(code_string, "ai");
          break;
      }
    },
    [onAddTestMessage, onSendMessage, onTestResponse],
  );

  return (
    <div className="fixed top-0 left-0 h-full">
      <div
        className={`
          fixed top-0 left-0 h-full bg-background border-r border-border 
          transition-all duration-500 ease-in-out overflow-hidden
          w-64 ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%-4.5rem)]"}
        `}
      >
        <div className="p-4 w-64">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Chat Controls
          </h2>
          <div className="flex flex-col space-y-2">
            {testButtons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleAction(button.action)}
                variant="outline"
                size="sm"
                className={`
                  transition-all duration-300 ease-in-out
                  ${
                    isOpen
                      ? "w-full opacity-100 translate-x-0"
                      : "w-0 opacity-0 -translate-x-full"
                  }
                `}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "500ms",
                }}
              >
                <span className="whitespace-nowrap overflow-hidden">
                  {button.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={`
          fixed top-4 left-0 z-10 transition-transform duration-500 ease-in-out w-10
          ${isOpen ? "translate-x-[15rem]" : "translate-x-[calc(1rem)]"}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
