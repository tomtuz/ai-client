import { MessageContent } from '@/types/chat';
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { MessageHeader } from './MessageHeader';

interface UserMessageProps {
  message: MessageContent;
  onCopy: () => void;
  onDelete: () => void;
  isCopied: boolean;
}

export function UserMessage({
  message,
  onCopy,
  onDelete,
  isCopied,
}: UserMessageProps) {
  const codeContent =
    message.content.length > 1
      ? message.content.join('\n')
      : message.content[0].text;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg bg-chat-content shadow-md">
      <MessageHeader
        role={message.role || 'user'}
        model={message.model}
        tokens={message.tokens?.input}
        onCopy={onCopy}
        onDelete={onDelete}
        isCopied={isCopied}
      />

      <div className="group cursor-pointer">
        <div className="message-content relative">
          <div
            className={clsx(
              "pointer-events-none absolute bottom-0 left-0 h-[calc(3em+1rem)] w-full bg-gradient-to-t from-chat-content transition-opacity duration-300 group-[:has(input[type='checkbox']:checked)]:opacity-0"
            )}
          />

          {/* to-transparent */}
          <input
            type="checkbox"
            id={`accordion-${message.id}`}
            className="peer/check-input absolute h-0 w-0 opacity-0"
          />
          <label
            htmlFor={`accordion-${message.id}`}
            className="flex items-center justify-between border-b-2 px-4 pt-2"
          >
            <div className="relative">
              <div className="max-h-[3em] overflow-hidden transition-all duration-300 group-[:has(input[type='checkbox']:checked)]:max-h-screen">
                <p className="select-text p-4 text-foreground">{codeContent}</p>
              </div>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-center p-2 transition-colors duration-200 hover:bg-accent">
          <ChevronDown className="block h-4 w-4 text-muted-foreground group-[:has(input[type='checkbox']:checked)]:hidden" />
          <ChevronUp className="hidden h-4 w-4 text-muted-foreground group-[:has(input[type='checkbox']:checked)]:block" />
          <span className="ml-2 text-sm text-muted-foreground">
            <span className="block group-[:has(input[type='checkbox']:checked)]:hidden">
              Expand
            </span>
            <span className="hidden group-[:has(input[type='checkbox']:checked)]:block">
              Collapse
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
