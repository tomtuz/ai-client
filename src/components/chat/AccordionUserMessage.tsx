import { MessageContent } from '@/types/chat';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@cn/ui';
import { MessageHeader } from './MessageHeader';

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
  const codeContent = Array.isArray(message.content)
    ? message.content.length > 1
      ? message.content.join('\n')
      : message.content[0].text
    : typeof message.content === 'string'
      ? message.content
      : '';

  return (
    <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md">
      <MessageHeader
        role={message.role || 'user'}
        model={message.model}
        tokens={message.tokens?.input}
        onCopy={onCopy}
        onDelete={() => {}} // Add a no-op function or implement delete functionality
        isCopied={isCopied}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="content">
          <AccordionTrigger>{codeContent.slice(0, 100)}</AccordionTrigger>
          <AccordionContent>
            <div className="p-4">
              <p className="select-text text-gray-700">{codeContent}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
