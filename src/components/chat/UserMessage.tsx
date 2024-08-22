import { MessageContent } from "@/types/chat";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MessageHeader } from "./MessageHeader";

interface UserMessageProps {
  message: MessageContent;
  onCopy: () => void;
  isCopied: boolean;
}

export function UserMessage({ message, onCopy, isCopied }: UserMessageProps) {
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
      <div className="group relative">
        <input
          type="checkbox"
          id={`accordion-${message.id}`}
          className="peer/check-input absolute opacity-0 w-0 h-0"
        />
        <label
          htmlFor={`accordion-${message.id}`}
          className="block cursor-pointer"
        >
          <div className="relative">
            <div className="group-[:has(input[type='checkbox']:checked)]:max-h-screen overflow-hidden transition-all duration-300 max-h-[3em]">
              <p className="p-4 text-gray-700 select-text">{codeContent}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent group-[:has(input[type='checkbox']:checked)]:opacity-0 transition-opacity duration-300" />
          </div>
          <div className="flex justify-center items-center p-2 hover:bg-gray-200 transition-colors duration-200">
            <ChevronDown className="block h-4 w-4 text-gray-500 group-[:has(input[type='checkbox']:checked)]:hidden" />
            <ChevronUp className="hidden h-4 w-4 text-gray-500 group-[:has(input[type='checkbox']:checked)]:block" />
            <span className="ml-2 text-sm text-gray-500">
              <span className="block group-[:has(input[type='checkbox']:checked)]:hidden">
                Expand
              </span>
              <span className="hidden group-[:has(input[type='checkbox']:checked)]:block">
                Collapse
              </span>
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
