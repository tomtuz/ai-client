import { MessageContent } from "@/types/chat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@cn/ui";
import { MessageHeader } from "./MessageHeader";

interface AccordionUserMessageProps {
  message: MessageContent;
  onCopy: () => void;
  isCopied: boolean;
}

export function AccordionUserMessage({
  message,
  onCopy,
  isCopied,
}: AccordionUserMessageProps) {
  const codeContent =
    message.content.length > 1
      ? message.content.join("\n")
      : message.content[0].text;

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
      <MessageHeader
        role={message.role || "user"}
        model={message.model}
        tokens={message.tokens?.input}
        onCopy={onCopy}
        isCopied={isCopied}
      />
      <Accordion
        type="single"
        collapsible
      >
        <AccordionItem value="content">
          <AccordionTrigger>{codeContent.slice(0, 100)}</AccordionTrigger>
          <AccordionContent>
            <div className="p-4">
              <p className="text-gray-700 select-text">{codeContent}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
