import { ShikiRender } from "@/lib/ShikiRender";
import { MessageContent } from "@/types/chat";
import { MessageHeader } from "./MessageHeader";

interface AIMessageProps {
  message: MessageContent;
  onCopy: () => void;
  isCopied: boolean;
}

export function AIMessage({ message, onCopy, isCopied }: AIMessageProps) {
  const codeContent =
    message.content.length > 1
      ? message.content.join("\n")
      : message.content[0].text;

  return (
    <div className="bg-blue-50 rounded-lg overflow-hidden shadow-md">
      <MessageHeader
        role={message.role || "test"}
        model={message.model}
        tokens={message.tokens?.input}
        onCopy={onCopy}
        isCopied={isCopied}
      />
      <div className="p-4">
        <ShikiRender
          code={codeContent}
          language="js"
        />
      </div>
    </div>
  );
}
