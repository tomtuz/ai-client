import { useClipBoard } from "@/hooks/clipboard";
import { MessageContent } from "@/types/chat";
import { AIMessage } from "./AIMessage";
import { AccordionUserMessage } from "./AccordionUserMessage";
import { DeleteButton } from "./DeleteButton";
import { UserMessage } from "./UserMessage";

interface MessageProps {
  message: MessageContent;
  onDelete: (id: string) => void;
  useShadcnAccordion?: boolean;
}

export function Message({
  message,
  onDelete,
  useShadcnAccordion = false,
}: MessageProps) {
  const { isCopied, copyToClipboard } = useClipBoard({ timeout: 2000 });

  const handleCopyMessage = () => {
    const codeContent =
      message.content.length > 1
        ? message.content.join("\n")
        : message.content[0].text;
    copyToClipboard(codeContent);
  };

  return (
    <div className="relative mb-6">
      {message.role === "ai" ? (
        <AIMessage
          message={message}
          onCopy={handleCopyMessage}
          isCopied={isCopied}
        />
      ) : useShadcnAccordion ? (
        <AccordionUserMessage
          message={message}
          onCopy={handleCopyMessage}
          isCopied={isCopied}
        />
      ) : (
        <UserMessage
          message={message}
          onCopy={handleCopyMessage}
          isCopied={isCopied}
        />
      )}
      <DeleteButton onDelete={() => onDelete(message.id)} />
    </div>
  );
}
